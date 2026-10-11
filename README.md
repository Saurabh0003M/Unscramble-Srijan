# NyaySetu — AI Legal Case Portal

**Live demo:** https://unscramble-srijan-portal.vercel.app

Built by team **Unscramble** for the Srijan hackathon (September 2026). A case portal for advocates
and citizens, with AI contract analysis and a voice intake flow.

## What it does

- **Case portal:** matters list, matter details, calendar, contacts, client portal, global search,
  eCourts case lookup
- **Contract analysis:** upload a contract, get green / yellow / red risk badges and a
  plain-English translation (Google Gemini)
- **AI call intake:** a citizen call demo that produces a case brief, reviewer triage and an advocate
  marketplace (contributed by [@Aryan2615](https://github.com/Aryan2615))
- **Case flow backend:** case tracks (fast / regular / complex), hearing scheduling and BNS section
  suggestions

The live demo runs the frontend only; contract analysis calls Gemini from the browser. The Python
and Node services below run locally.

## Services

| Folder | What it is | Stack | Port |
|---|---|---|---|
| `frontend/` | Case portal UI | React 19 · Vite · Tailwind CSS 4 · TypeScript | 5173 |
| `contract-ai/` | Contract parsing, risk scoring, report export | Python · FastAPI · ChromaDB | 8000 |
| `caseflow-ai/` | Case management, scheduling, BNS assist | Python · FastAPI | 8001 |
| `scheduler-api/` | Deadline alerts and RAG orchestration | Node.js · Express | 5000 |

## Run it on Windows

Needs Python 3.11+ and Node.js 20+ on PATH. Then double-click **`run.bat`** (or run `.\run.bat`).
It frees the four ports, creates each Python virtual environment, installs dependencies, and starts
all four services.

API keys go in each service's `.env` file (see `scheduler-api/.env.example`). Never commit them.
