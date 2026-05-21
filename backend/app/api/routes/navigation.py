"""API routes – Navigation & Pathfinding"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.schemas.building import NavigationRequest, NavigationResponse
from app.services.building_service import building_service
from app.services.navigation_service import navigation_service

router = APIRouter(prefix="/navigation", tags=["Navigation"])


@router.post("/route", response_model=NavigationResponse)
async def get_route(payload: NavigationRequest, db: AsyncSession = Depends(get_db)):
    origin = await building_service.get_by_id(db, payload.origin_building_id)
    destination = await building_service.get_by_id(db, payload.destination_building_id)

    if not origin:
        raise HTTPException(status_code=404, detail=f"Origin building {payload.origin_building_id} not found")
    if not destination:
        raise HTTPException(status_code=404, detail=f"Destination building {payload.destination_building_id} not found")

    # Refresh graph with latest buildings
    all_buildings = await building_service.get_all(db)
    navigation_service.build_graph(all_buildings)

    try:
        return navigation_service.find_route(
            origin, destination,
            mode=payload.mode,
            accessibility=payload.accessibility,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
