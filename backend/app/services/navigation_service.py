"""
CampusMind AI – Navigation Service
Graph-based pathfinding using NetworkX with NTU campus data.
"""

import math
import networkx as nx
from loguru import logger

from app.schemas.building import BuildingRead, NavigationResponse, NavigationStep


# Walking speed assumptions
WALK_SPEED_MS = 1.4     # metres per second (~5 km/h)
CYCLE_SPEED_MS = 4.2    # metres per second (~15 km/h)
SHUTTLE_SPEED_MS = 8.3  # metres per second (~30 km/h)


def _haversine(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Return great-circle distance in metres."""
    R = 6_371_000
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lng2 - lng1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


class NavigationService:
    def __init__(self) -> None:
        self.graph: nx.Graph = nx.Graph()

    def build_graph(self, buildings: list[BuildingRead]) -> None:
        """
        Build a fully-connected campus graph.
        Edge weight = haversine distance (metres).
        In production, replace with actual NTU path data from OSM.
        """
        self.graph.clear()
        for b in buildings:
            self.graph.add_node(b.id, data=b, lat=b.latitude, lng=b.longitude)

        for i, src in enumerate(buildings):
            for dst in buildings[i + 1 :]:
                dist = _haversine(src.latitude, src.longitude, dst.latitude, dst.longitude)
                self.graph.add_edge(src.id, dst.id, weight=dist)

        logger.info(f"Campus graph built: {len(buildings)} nodes, {self.graph.number_of_edges()} edges")

    def find_route(
        self,
        origin: BuildingRead,
        destination: BuildingRead,
        mode: str = "walking",
        accessibility: bool = False,
    ) -> NavigationResponse:
        """Return a NavigationResponse with A* shortest path."""
        if not self.graph.has_node(origin.id) or not self.graph.has_node(destination.id):
            raise ValueError("Origin or destination not found in campus graph.")

        def heuristic(a: int, b: int) -> float:
            ad = self.graph.nodes[a]["data"]
            bd = self.graph.nodes[b]["data"]
            return _haversine(ad.latitude, ad.longitude, bd.latitude, bd.longitude)

        path_ids: list[int] = nx.astar_path(
            self.graph, origin.id, destination.id, heuristic=heuristic, weight="weight"
        )

        total_dist = sum(
            _haversine(
                self.graph.nodes[path_ids[i]]["data"].latitude,
                self.graph.nodes[path_ids[i]]["data"].longitude,
                self.graph.nodes[path_ids[i + 1]]["data"].latitude,
                self.graph.nodes[path_ids[i + 1]]["data"].longitude,
            )
            for i in range(len(path_ids) - 1)
        )

        speed = {"walking": WALK_SPEED_MS, "cycling": CYCLE_SPEED_MS, "shuttle": SHUTTLE_SPEED_MS}.get(
            mode, WALK_SPEED_MS
        )
        estimated_minutes = (total_dist / speed) / 60

        steps: list[NavigationStep] = []
        polyline: list[tuple[float, float]] = []
        for i, node_id in enumerate(path_ids):
            node_data: BuildingRead = self.graph.nodes[node_id]["data"]
            polyline.append((node_data.latitude, node_data.longitude))
            if i < len(path_ids) - 1:
                next_data: BuildingRead = self.graph.nodes[path_ids[i + 1]]["data"]
                seg_dist = _haversine(
                    node_data.latitude, node_data.longitude,
                    next_data.latitude, next_data.longitude,
                )
                steps.append(
                    NavigationStep(
                        instruction=f"Head towards {next_data.name}",
                        distance_m=round(seg_dist, 1),
                        landmark=next_data.short_name,
                    )
                )

        return NavigationResponse(
            origin=origin,
            destination=destination,
            total_distance_m=round(total_dist, 1),
            estimated_minutes=round(estimated_minutes, 1),
            steps=steps,
            polyline=polyline,
        )


# Singleton
navigation_service = NavigationService()
