"""
CampusMind AI – Building / Location Service
Handles CRUD + semantic search for NTU buildings.
"""

from __future__ import annotations

import json
import math
from pathlib import Path

from loguru import logger
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.building import Building
from app.schemas.building import BuildingCreate, BuildingRead


class BuildingService:

    # ── CRUD ─────────────────────────────────────────────────────────────────

    async def get_all(self, db: AsyncSession) -> list[BuildingRead]:
        result = await db.execute(select(Building))
        rows = result.scalars().all()
        return [BuildingRead.model_validate(r) for r in rows]

    async def get_by_id(self, db: AsyncSession, building_id: int) -> BuildingRead | None:
        result = await db.execute(select(Building).where(Building.id == building_id))
        row = result.scalar_one_or_none()
        return BuildingRead.model_validate(row) if row else None

    async def search_by_name(self, db: AsyncSession, query: str) -> list[BuildingRead]:
        """Simple ILIKE search (works with SQLite too via lower())."""
        q = query.lower()
        result = await db.execute(select(Building))
        rows = result.scalars().all()
        matches = [
            r for r in rows
            if q in r.name.lower()
            or q in (r.short_name or "").lower()
            or q in (r.code or "").lower()
        ]
        return [BuildingRead.model_validate(m) for m in matches]

    async def create(self, db: AsyncSession, data: BuildingCreate) -> BuildingRead:
        obj = Building(**data.model_dump())
        db.add(obj)
        await db.flush()
        await db.refresh(obj)
        return BuildingRead.model_validate(obj)

    # ── Proximity search ──────────────────────────────────────────────────────

    async def nearby(
        self,
        db: AsyncSession,
        lat: float,
        lng: float,
        radius_m: float = 500,
        limit: int = 10,
    ) -> list[tuple[BuildingRead, float]]:
        """Return (building, distance_m) pairs within radius, sorted by distance."""
        all_buildings = await self.get_all(db)
        results: list[tuple[BuildingRead, float]] = []

        for b in all_buildings:
            dist = _haversine(lat, lng, b.latitude, b.longitude)
            if dist <= radius_m:
                results.append((b, round(dist, 1)))

        results.sort(key=lambda x: x[1])
        return results[:limit]

    # ── Seed from JSON ─────────────────────────────────────────────────────────

    async def seed_from_json(self, db: AsyncSession, json_path: Path) -> int:
        """Load initial NTU building data from a JSON file."""
        if not json_path.exists():
            logger.warning(f"Seed file not found: {json_path}")
            return 0

        with open(json_path) as f:
            records: list[dict] = json.load(f)

        count = 0
        for rec in records:
            existing = await db.execute(select(Building).where(Building.code == rec["code"]))
            if existing.scalar_one_or_none() is None:
                db.add(Building(**rec))
                count += 1

        await db.flush()
        logger.info(f"Seeded {count} buildings from {json_path}")
        return count


def _haversine(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    R = 6_371_000
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi, dlambda = math.radians(lat2 - lat1), math.radians(lng2 - lng1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


building_service = BuildingService()
