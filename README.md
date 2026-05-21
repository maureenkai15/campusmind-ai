# 🎓 CampusMind AI
**AI-powered smart university navigation system for NTU (Nanyang Technological University)**

> Find any building, get walking/cycling/shuttle routes, and chat with a local AI assistant — entirely free, no API keys required.

---

## ✨ Features

| Feature | Stack |
|---|---|
| 🗺️ Interactive campus map | Leaflet / react-leaflet (OSM tiles) |
| 🧭 Smart pathfinding (A\*, Dijkstra) | NetworkX + custom NTU graph |
| 🤖 AI chat assistant | Ollama (Llama 3.2, Mistral, etc.) |
| 🔍 Semantic building search | sentence-transformers + FAISS |
| 📍 Proximity search | Haversine / geopy |
| 🔐 Auth | JWT (python-jose + bcrypt) |
| 📅 Schedule integration | Coming soon |

---

## 🛠️ Tech Stack (100% free / open-source)

**Backend**
- [FastAPI](https://fastapi.tiangolo.com/) — async Python web framework
- [SQLAlchemy 2 + aiosqlite](https://docs.sqlalchemy.org/en/20/) — async ORM
- [Ollama](https://ollama.ai/) — local LLM inference (no API key!)
- [NetworkX](https://networkx.org/) — graph pathfinding
- [sentence-transformers](https://www.sbert.net/) — free embeddings

**Frontend**
- [Next.js 15](https://nextjs.org/) — React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first styling
- [Leaflet](https://leafletjs.com/) — free open-source maps (OSM)

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 20+
- [Ollama](https://ollama.ai/download) installed and running

### 1. Clone & setup backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate       # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # Edit as needed
uvicorn app.main:app --reload
# API: http://localhost:8000
# Docs: http://localhost:8000/docs
```

### 2. Pull an AI model (Ollama)

```bash
ollama pull llama3.2            # ~2 GB, fast responses
# or: ollama pull mistral       # Alternative
# or: ollama pull phi3          # Lightweight option
```

### 3. Setup frontend

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
# App: http://localhost:3000
```

### 4. (Optional) Docker Compose — runs everything at once

```bash
docker compose up --build
# Then: docker exec campusmind-ai-ollama-1 ollama pull llama3.2
```

---

## 📁 Project Structure

```
CampusMind-AI/
├── frontend/                   # Next.js + TypeScript + Tailwind
│   └── src/
│       ├── app/                # App Router pages
│       │   ├── page.tsx        # Landing page
│       │   ├── map/            # Campus map
│       │   ├── assistant/      # AI chat
│       │   └── schedule/       # Timetable
│       ├── components/         # Reusable UI components
│       ├── lib/                # API client, utils
│       └── types/              # TypeScript types
│
├── backend/                    # FastAPI
│   └── app/
│       ├── main.py             # App entry point
│       ├── api/routes/         # REST endpoints
│       ├── core/               # Config, JWT auth
│       ├── models/             # SQLAlchemy ORM
│       ├── schemas/            # Pydantic models
│       ├── services/           # Business logic
│       └── db/                 # Database session
│
├── docker-compose.yml          # One-command dev stack
└── README.md
```

---

## 🗺️ API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/buildings/` | List all NTU buildings |
| GET | `/api/v1/buildings/search?q=hive` | Search buildings |
| GET | `/api/v1/buildings/nearby?lat=1.34&lng=103.68` | Find nearby buildings |
| POST | `/api/v1/navigation/route` | Get a campus route |
| POST | `/api/v1/assistant/chat` | Stream AI response |
| POST | `/api/v1/users/register` | Register user |
| POST | `/api/v1/users/login` | Login → JWT tokens |

Full interactive docs at `http://localhost:8000/docs`

---

## 🤖 AI Models (all free via Ollama)

| Model | Size | Best for |
|-------|------|----------|
| `llama3.2` | ~2 GB | Recommended default |
| `mistral` | ~4 GB | Better reasoning |
| `phi3` | ~1.5 GB | Fast, lower-spec machines |
| `gemma2` | ~5 GB | Strong instruction following |

---

## 🗓️ Roadmap

- [ ] Leaflet map with NTU building markers
- [ ] Indoor navigation (floor plans)
- [ ] Shuttle bus live tracker
- [ ] NTU timetable import (STARS)
- [ ] Offline PWA support
- [ ] Accessibility routing (wheelchair-friendly paths)
- [ ] Crowd density heatmap

---

## 📄 License

MIT — free to use, modify, and distribute.
