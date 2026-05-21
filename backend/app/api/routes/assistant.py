"""API routes – AI Chat Assistant (streaming SSE)"""

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from app.services.ai_service import ai_service

router = APIRouter(prefix="/assistant", tags=["AI Assistant"])


class ChatRequest(BaseModel):
    message: str
    history: list[dict] | None = None
    context: str | None = None


@router.post("/chat")
async def chat(payload: ChatRequest):
    """
    Stream AI assistant response tokens via Server-Sent Events (SSE).
    Frontend should use EventSource or fetch with ReadableStream.
    """

    async def generate():
        # If Ollama is not reachable (e.g. hosted deployment), return a helpful message
        if not await ai_service.is_available():
            msg = (
                "🤖 The AI assistant requires Ollama running locally. "
                "To enable it: install Ollama (ollama.ai), run `ollama pull llama3.2`, "
                "then start the backend locally. The map & navigation features work without it!"
            )
            yield f"data: {msg}\n\n"
            yield "data: [DONE]\n\n"
            return

        async for token in ai_service.chat_stream(
            user_message=payload.message,
            history=payload.history,
            context=payload.context,
        ):
            yield f"data: {token}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",    # disable nginx buffering
        },
    )


@router.get("/health")
async def assistant_health():
    available = await ai_service.is_available()
    return {
        "ollama_available": available,
        "model": ai_service.model,
    }
