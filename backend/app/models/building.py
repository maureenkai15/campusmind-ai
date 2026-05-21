"""ORM model – NTU Building / Location"""

from sqlalchemy import Float, Integer, String, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.db.database import Base


class Building(Base):
    __tablename__ = "buildings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    code: Mapped[str] = mapped_column(String(20), unique=True, index=True)   # e.g. "NS1", "TR+72"
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    short_name: Mapped[str | None] = mapped_column(String(80))
    description: Mapped[str | None] = mapped_column(Text)
    category: Mapped[str] = mapped_column(String(80))  # academic | admin | canteen | sports | etc.

    # Coordinates
    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)

    # Extra metadata (opening hours, facilities, etc.)
    metadata_json: Mapped[dict | None] = mapped_column(JSON)

    # Embedding vector (stored as JSON list; replace with pgvector in prod)
    embedding: Mapped[list | None] = mapped_column(JSON)
