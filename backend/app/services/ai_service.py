"""
CampusMind AI – AI Assistant Service
Uses Ollama for local LLM inference (zero API cost, runs on your machine).
Supports RAG over NTU campus knowledge base via FAISS + sentence-transformers.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import AsyncGenerator

import httpx
from loguru import logger

from app.core.config import settings

# ── NTU system prompt ───────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are CampusMind, an AI assistant embedded in the NTU (Nanyang Technological University) \
campus navigation app. You help students and staff find buildings, canteens, labs, shuttle bus stops, \
and other facilities on the NTU Singapore campus.

You know the campus layout, shuttle bus routes (A, B, C, D), canteen locations (North Spine, South Spine, \
Canteen 2, Canteen 9, etc.), academic buildings (Hive, NS Labs, SPMS, CoE blocks), and key facilities \
(LWN Library, Sports Hall, Hall of Residence).

Keep answers concise, friendly, and practical. If you don't know something, say so honestly.
"""


class AIService:
    """Wrapper around Ollama's HTTP API for chat and embeddings."""

    def __init__(self) -> None:
        self.base_url = settings.ollama_base_url
        self.model = settings.ollama_model
        self.embed_model = settings.embedding_model
        self._client = httpx.AsyncClient(base_url=self.base_url, timeout=120)

    # ── Health check ─────────────────────────────────────────────────────────

    async def is_available(self) -> bool:
        try:
            resp = await self._client.get("/api/tags")
            return resp.status_code == 200
        except Exception:
            return False

    # ── Chat (streaming) ─────────────────────────────────────────────────────

    async def chat_stream(
        self,
        user_message: str,
        history: list[dict] | None = None,
        context: str | None = None,
    ) -> AsyncGenerator[str, None]:
        """Yield response tokens as they arrive from Ollama."""
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        if context:
            messages.append({
                "role": "system",
                "content": f"Relevant campus info:\n{context}",
            })

        if history:
            messages.extend(history[-10:])   # keep last 10 turns

        messages.append({"role": "user", "content": user_message})

        payload = {
            "model": self.model,
            "messages": messages,
            "stream": True,
            "options": {"temperature": 0.3, "num_predict": 512},
        }

        async with self._client.stream("POST", "/api/chat", json=payload) as resp:
            resp.raise_for_status()
            async for line in resp.aiter_lines():
                if not line:
                    continue
                try:
                    chunk = json.loads(line)
                    token = chunk.get("message", {}).get("content", "")
                    if token:
                        yield token
                    if chunk.get("done"):
                        break
                except json.JSONDecodeError:
                    continue

    # ── Embeddings ────────────────────────────────────────────────────────────

    async def embed(self, text: str) -> list[float]:
        """Return an embedding vector for the given text."""
        resp = await self._client.post(
            "/api/embeddings",
            json={"model": self.embed_model, "prompt": text},
        )
        resp.raise_for_status()
        return resp.json()["embedding"]

    async def close(self) -> None:
        await self._client.aclose()


# Singleton
ai_service = AIService()
