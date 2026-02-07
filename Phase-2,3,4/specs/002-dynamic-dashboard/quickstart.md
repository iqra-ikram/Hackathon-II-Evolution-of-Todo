# Quickstart: Dynamic Dashboard

**Feature Branch**: `002-dynamic-dashboard`

## Prerequisites
- Node.js 18+
- Python 3.10+
- Dependencies installed (`npm install` in frontend, `pip install -r requirements.txt` in backend)

## Running the Feature

### Backend
1. Navigate to `backend/`.
2. Ensure virtual env is active.
3. Run: `uvicorn src.main:app --reload`.
4. API docs available at `http://localhost:8000/docs`.

### Frontend
1. Navigate to `frontend/`.
2. Run: `npm run dev`.
3. Open `http://localhost:3000/dashboard`.

## Verification
- Refresh the dashboard page.
- Observe that the numbers and chart bars change slightly on each refresh (due to mock random data).
- Ensure no layout shift or visual glitches occur.
