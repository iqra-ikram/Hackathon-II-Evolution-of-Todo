---
id: "001"
title: "Fix CORS Error by Updating Auth URL"
stage: "green"
date: "2026-02-11"
surface: "agent"
model: "gemini-2.0-flash-thinking-exp"
feature: "auth-cors-fix"
branch: "main"
user: "Iqra7"
command: "search_file_content"
labels:
  - "cors"
  - "vercel"
  - "deployment"
  - "environment-variables"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "frontend/src/lib/auth-client.ts"
tests_yaml: []
prompt_text: |
  when im trying to log in after deployement its giving me this error (index):1 Access to fetch at 'http://localhost:3000/api/auth/get-session' from origin 'https://hackathon-ii-evolution-of-todo-xfc6.vercel.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
  localhost:3000/api/auth/get-session:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
  (index):1 Access to fetch at 'http://localhost:3000/api/auth/sign-in/email' from origin 'https://hackathon-ii-evolution-of-todo-xfc6.vercel.app' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
  localhost:3000/api/auth/sign-in/email:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
  337b1e94112a6730.js:37   Uncaught (in promise) TypeError: Failed to fetch
      at i6 (337b1e94112a6730.js:37:27692)
      at async m (337b1e94112a6730.js:37:33836)
      at async Object.apply (337b1e94112a6730.js:37:38773)
      at async x (6c1efed42e3b230c.js:1:34573)Understand this error
  (index):1 Access to fetch at 'http://localhost:3000/api/auth/get-session' from origin 'https://hackathon-ii-evolution-of-todo-xfc6.vercel.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
  localhost:3000/api/auth/get-session:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
  (index):1 Access to fetch at 'http://localhost:3000/api/auth/get-session' from origin 'https://hackathon-ii-evolution-of-todo-xfc6.vercel.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
  localhost:3000/api/auth/get-session:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
  (index):1 Access to fetch at 'http://localhost:3000/api/auth/get-session' from origin 'https://hackathon-ii-evolution-of-todo-xfc6.vercel.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
  localhost:3000/api/auth/get-session:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
  (index):1 Access to fetch at 'http://localhost:3000/api/auth/get-session' from origin 'https://hackathon-ii-evolution-of-todo-xfc6.vercel.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
  localhost:3000/api/auth/get-session:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
  (index):1 Access to fetch at 'http://localhost:3000/api/auth/get-session' from origin 'https://hackathon-ii-evolution-of-todo-xfc6.vercel.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
  localhost:3000/api/auth/get-session:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
  (index):1 Access to fetch at 'http://localhost:3000/api/auth/get-session' from origin 'https://hackathon-ii-evolution-of-todo-xfc6.vercel.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
  337b1e94112a6730.js:37  GET http://localhost:3000/api/auth/get-session net::ERR_FAILED 200 (OK)
response_text: |
  Analyzed the CORS error and identified the root cause as the `NEXT_PUBLIC_BETTER_AUTH_URL` environment variable being set to `http://localhost:3000` in the Vercel deployment. This caused the frontend to attempt requests to localhost instead of the production backend.

  Advised the user to:
  1.  Update `NEXT_PUBLIC_BETTER_AUTH_URL` in Vercel Project Settings to `https://hackathon-ii-evolution-of-todo-xfc6.vercel.app`.
  2.  Redeploy the application to ensure the new environment variable value is inlined into the build.
evaluation:
  outcome: "success"
  reason: "Correctly identified the configuration issue causing the CORS error."
---
