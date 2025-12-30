# Phase II Todo App

Full-Stack Todo Application with Next.js 16 and FastAPI.

## Prerequisites
- Node.js v18+
- Python 3.11+
- Neon DB (PostgreSQL)

## Setup

### Backend
1. `cd backend`
2. `python -m venv venv`
3. `venv\Scripts\activate` (Win) or `source venv/bin/activate` (Mac/Linux)
4. `pip install -r requirements.txt`
5. Create `.env` from `backend/.env` (update secrets).
   - `DATABASE_URL` (Neon Postgres)
   - `BETTER_AUTH_SECRET` (Shared with frontend)
6. Run: `uvicorn src.main:app --reload`

### Frontend
1. `cd frontend`
2. `npm install`
3. Create `.env.local` from `frontend/.env.local` (update secrets).
   - `NEXT_PUBLIC_API_URL` (e.g. `http://localhost:8000/api`)
   - `BETTER_AUTH_SECRET` (Shared with backend)
   - `BETTER_AUTH_URL` (e.g. `http://localhost:3000`)
4. Run: `npm run dev`

## Features
- **Authentication**: Secure Signup/Login using Better Auth and JWT.
- **Tasks**: Create, List, Edit, Delete tasks.
- **Toggle**: Mark tasks as completed/active.
- **Security**: Data isolation per user.
