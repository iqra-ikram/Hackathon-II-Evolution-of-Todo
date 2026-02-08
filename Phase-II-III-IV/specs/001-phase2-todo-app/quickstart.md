# Quickstart: Phase II Todo App

**Feature**: Phase II Todo Full-Stack Web Application

## Prerequisites
- Node.js v18+ (for Next.js 16)
- Python 3.11+
- Neon DB Project (Postgres Connection String)

## Setup

### 1. Repository Clone
```bash
git clone https://github.com/iqra-ikram/Hackathon-II-Evolution-of-Todo.git
cd Hackathon-II-Evolution-of-Todo
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
# source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env with DATABASE_URL and BETTER_AUTH_SECRET
uvicorn src.main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with NEXT_PUBLIC_API_URL and BETTER_AUTH_SECRET
npm run dev
```

## Running Tests
- Backend: `pytest`
- Frontend: `npm test`
