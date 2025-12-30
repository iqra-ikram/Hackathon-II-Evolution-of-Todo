---
id: 006
title: fix-better-auth-relation-error
stage: misc
date: 2025-12-30
surface: agent
model: gemini
feature: 001-phase2-todo-app
branch: 001-phase2-todo-app
user: iqra
command: fix
labels: ["bugfix", "better-auth", "postgres", "migration"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/.env.local
 - backend/.env
tests:
 - manual verification
---

## Prompt

POST /api/auth/sign-up/email 500 in 3.4s (compile: 22ms, render: 3.3s)
2025-12-30T17:57:38.824Z ERROR [Better Auth]: relation "user" does not exist
# SERVER_ERROR:  error: relation "user" does not exist
    at ignore-listed frames {
  length: 103,
  severity: 'ERROR',
  code: '42P01',
  detail: undefined,
  hint: undefined,
  position: '40',
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'parse_relation.c',
  line: '1449',
  routine: 'parserOpenTable'
}
 POST /api/auth/sign-up/email 500 in 3.4s (compile: 5ms, render: 3.4s)
2025-12-30T17:57:39.861Z ERROR [Better Auth]: relation "user" does not exist
# SERVER_ERROR:  error: relation "user" does not exist
    at ignore-listed frames {
  length: 103,
  severity: 'ERROR',
  code: '42P01',
  detail: undefined,
  hint: undefined,
  position: '40',
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'parse_relation.c',
  line: '1449',
  routine: 'parserOpenTable'
}
 POST /api/auth/sign-up/email 500 in 4.2s (compile: 6ms, render: 4.2s)
2025-12-30T17:57:40.517Z ERROR [Better Auth]: relation "user" does not exist
# SERVER_ERROR:  error: relation "user" does not exist
    at ignore-listed frames {
  length: 103,
  severity: 'ERROR',
  code: '42P01',
  detail: undefined,
  hint: undefined,
  position: '40',
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'parse_relation.c',
  line: '1449',
  routine: 'parserOpenTable'
}
 POST /api/auth/sign-up/email 500 in 3.7s (compile: 18ms, render: 3.7s) solve this error

## Response snapshot

Fixed the "relation user does not exist" error by running the `better-auth` migration.
Identified that the `DATABASE_URL` in `frontend/.env.local` and `backend/.env` was truncated/incorrect (missing the host suffix and database name).
Corrected the environment files and successfully ran `npx @better-auth/cli migrate`.

## Outcome

- ✅ Impact: App can now sign up/login users. Database tables created.
- 🧪 Tests: Verified DB connection with script, ran migration successfully.
- 📁 Files: Updated .env files.
- 🔁 Next prompts: Continue implementation.
- 🧠 Reflection: The truncated env file was a tricky red herring, but the ping check confirmed it.

## Evaluation notes (flywheel)

- Failure modes observed: Invalid environment configuration causing migration tools to fail.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
