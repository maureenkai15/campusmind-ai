"""API routes – Buildings & Locations"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.schemas.building import BuildingCreate, BuildingRead
from app.services.building_service import building_service

router = APIRouter(prefix="/buildings", tags=["Buildings"])


@router.get("/", response_model=list[BuildingRead])
async def list_buildings(db: AsyncSession = Depends(get_db)):
    return await building_service.get_all(db)


@router.get("/search", response_model=list[BuildingRead])
async def search_buildings(
    q: str = Query(..., min_length=1, description="Search query"),
    db: AsyncSession = Depends(get_db),
):
    return await building_service.search_by_name(db, q)


@router.get("/nearby", response_model=list[dict])
async def nearby_buildings(
    lat: float = Query(..., description="Latitude"),
    lng: float = Query(..., description="Longitude"),
    radius_m: float = Query(default=500, le=2000),
    limit: int = Query(default=10, le=50),
    db: AsyncSession = Depends(get_db),
):
    results = await building_service.nearby(db, lat, lng, radius_m, limit)
    return [{"building": b, "distance_m": d} for b, d in results]


@router.get("/{building_id}", response_model=BuildingRead)
async def get_building(building_id: int, db: AsyncSession = Depends(get_db)):
    building = await building_service.get_by_id(db, building_id)
    if not building:
        raise HTTPException(status_code=404, detail="Building not found")
    return building


@router.post("/", response_model=BuildingRead, status_code=201)
async def create_building(payload: BuildingCreate, db: AsyncSession = Depends(get_db)):
    return await building_service.create(db, payload)
