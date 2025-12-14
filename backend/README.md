# Backend (FastAPI)

## Run (local)
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env

uvicorn app:app --reload --port 8000
```

- POST `http://localhost:8000/api/emails` with JSON: `{"email":"test@example.com"}`
- GET `http://localhost:8000/health`
