---
id: "001"
title: "Fix Frontend Auth Crash"
stage: "misc"
date: "2026-02-10"
surface: "agent"
model: "gemini-2.0-pro-exp-0211"
feature: "none"
branch: "unknown"
user: "Iqra7"
command: "fix-auth"
labels:
  - "bugfix"
  - "config"
  - "env"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "frontend/.env"
tests: []
prompt: |
  Failed to load resource: net::ERR_CONNECTION_REFUSEDUnderstand this error
  localhost:3000/api/auth/sign-in/email:1 Failed to load resource: net::ERR_CONNECTION_REFUSEDUnderstand this error
  ...
  its giving me this error when im trying to log in
response: |
  Detected missing `.env` file in `frontend/` causing Next.js server crash.
  Copied `DATABASE_URL` and `BETTER_AUTH_SECRET` from `backend/.env` to `frontend/.env` and added `NEXT_PUBLIC_BETTER_AUTH_URL`.
  User needs to restart the frontend server.
---
