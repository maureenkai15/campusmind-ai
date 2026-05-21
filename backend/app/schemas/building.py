"""Pydantic schemas – Building / Location"""

from pydantic import BaseModel, Field


class BuildingBase(BaseModel):
    code: str
    name: str
    short_name: str | None = None
    description: str | None = None
    category: str
    latitude: float
    longitude: float


class BuildingCreate(BuildingBase):
    pass


class BuildingRead(BuildingBase):
    id: int
    model_config = {"from_attributes": True}


class NavigationRequest(BaseModel):
    origin_building_id: int
    destination_building_id: int
    mode: str = Field(default="walking", pattern="^(walking|cycling|shuttle)$")
    accessibility: bool = False   # wheelchair-friendly routing


class NavigationStep(BaseModel):
    instruction: str
    distance_m: float
    landmark: str | None = None


class NavigationResponse(BaseModel):
    origin: BuildingRead
    destination: BuildingRead
    total_distance_m: float
    estimated_minutes: float
    steps: list[NavigationStep]
    polyline: list[tuple[float, float]]   # (lat, lng) pairs
