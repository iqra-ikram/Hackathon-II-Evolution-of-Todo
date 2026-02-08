# Quickstart: Intelligent Todo Agent

## Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL (Neon)
- `GROK_API_KEY` (xAI)
- `BETTER_AUTH_SECRET`
- `DATABASE_URL`

## Backend Setup

1. **Install Dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
   *Ensure `openai`, `mcp`, `sqlmodel`, `fastapi` are included.*

2. **Environment Variables**:
   Create `backend/.env`:
   ```env
   DATABASE_URL=postgresql://user:pass@host/db
   GROK_API_KEY=xai-...
   BETTER_AUTH_SECRET=...
   ```

3. **Run Migrations**:
   ```bash
   alembic upgrade head
   ```

4. **Start Server**:
   ```bash
   uvicorn src.main:app --reload
   ```

## Frontend Setup

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Variables**:
   Create `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   BETTER_AUTH_SECRET=...
   BETTER_AUTH_URL=http://localhost:3000
   ```

3. **Start Client**:
   ```bash
   npm run dev
   ```

## Usage
1. Open `http://localhost:3000`.
2. Log in.
3. Navigate to the Chat interface.
4. Type "Add a task to buy milk".
5. Verify response and task creation.
