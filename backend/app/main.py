"""
CampusMind AI – FastAPI Application Entry Point
"""

from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from app.api.routes import assistant, buildings, navigation, users
from app.core.config import settings
from app.db.database import init_db
from app.services.building_service import building_service


@asynccontextmanager
async def lifespan(app: FastAPI):
    # ── Startup ────────────────────────────────────────────────────────────
    logger.info(f"🚀 Starting {settings.app_name} [{settings.app_env}]")

    await init_db()
    logger.info("✅ Database initialised")

    # Seed NTU buildings from JSON if available
    seed_file = Path(__file__).parent.parent / "data" / "ntu_buildings" / "buildings.json"
    from app.db.database import AsyncSessionLocal
    async with AsyncSessionLocal() as db:
        seeded = await building_service.seed_from_json(db, seed_file)
        if seeded:
            logger.info(f"✅ Seeded {seeded} NTU buildings")

    yield

    # ── Shutdown ───────────────────────────────────────────────────────────
    from app.services.ai_service import ai_service
    await ai_service.close()
    logger.info("👋 CampusMind AI shut down")


# ── App instance ────────────────────────────────────────────────────────────

app = FastAPI(
    title=settings.app_name,
    description="AI-powered smart navigation system for NTU students",
    version="0.1.0",
    lifespan=lifespan,
    docs_url="/docs" if not settings.is_production else None,
    redoc_url="/redoc" if not settings.is_production else None,
)

# ── CORS ─────────────────────────────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────

API_PREFIX = "/api/v1"

app.include_router(users.router, prefix=API_PREFIX)
app.include_router(buildings.router, prefix=API_PREFIX)
app.include_router(navigation.router, prefix=API_PREFIX)
app.include_router(assistant.router, prefix=API_PREFIX)


# ── Root ──────────────────────────────────────────────────────────────────────

@app.get("/", tags=["Health"])
async def root():
    return {
        "app": settings.app_name,
        "version": "0.1.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health", tags=["Health"])
async def health():
    return {"status": "ok"}
