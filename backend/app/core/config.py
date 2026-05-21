"""
CampusMind AI – Application Configuration
Uses pydantic-settings to load from environment / .env file.
"""

from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ── App ──────────────────────────────────────────
    app_name: str = "CampusMind AI"
    app_env: str = "development"
    debug: bool = True
    secret_key: str = "change-me"

    # ── Server ───────────────────────────────────────
    host: str = "0.0.0.0"
    port: int = 8000
    allowed_origins: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    # ── Database ─────────────────────────────────────
    database_url: str = "sqlite+aiosqlite:///./campusmind.db"

    # ── JWT Auth ─────────────────────────────────────
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    refresh_token_expire_days: int = 7

    # ── AI / Ollama ───────────────────────────────────
    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "llama3.2"
    embedding_model: str = "nomic-embed-text"

    # ── NTU Campus ────────────────────────────────────
    ntu_campus_center_lat: float = 1.3483
    ntu_campus_center_lng: float = 103.6831

    @property
    def is_production(self) -> bool:
        return self.app_env == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
