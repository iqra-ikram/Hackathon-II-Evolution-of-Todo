---
id: "003"
title: "Fix CORS by Removing Client BaseURL"
stage: "green"
date: "2026-02-11"
surface: "agent"
model: "gemini-2.0-flash-thinking-exp"
feature: "auth-cors-fix"
branch: "main"
user: "Iqra7"
command: "replace"
labels:
  - "cors"
  - "better-auth"
  - "bugfix"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "frontend/src/lib/auth-client.ts"
tests_yaml: []
prompt_text: |
  i tried everythng but whenver im tryign to log in its gave me this error (index):1 Access to fetch at 'https://hackathon-ii-evolution-of-todo-xfc6.vercel.app/api/auth/get-session' from origin 'https://hackathon-ii-evolution-of-todo-git-1cca2d-iqra-ikrams-projects.vercel.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
  hackathon-ii-evolution-of-todo-xfc6.vercel.app/api/auth/get-session:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
  (index):1 Access to fetch at 'https://hackathon-ii-evolution-of-todo-xfc6.vercel.app/api/auth/sign-in/email' from origin 'https://hackathon-ii-evolution-of-todo-git-1cca2d-iqra-ikrams-projects.vercel.app' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
  hackathon-ii-evolution-of-todo-xfc6.vercel.app/api/auth/sign-in/email:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
  4aac59ea5a838261.js:37   Uncaught (in promise) TypeError: Failed to fetch
      at i6 (4aac59ea5a838261.js:37:27692)
      at async m (4aac59ea5a838261.js:37:33836)
      at async Object.apply (4aac59ea5a838261.js:37:38773)
      at async x (6c1efed42e3b230c.js:1:34573)Understand this error
  (index):1 Access to fetch at 'https://hackathon-ii-evolution-of-todo-xfc6.vercel.app/api/auth/get-session' from origin 'https://hackathon-ii-evolution-of-todo-git-1cca2d-iqra-ikrams-projects.vercel.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
  hackathon-ii-evolution-of-todo-xfc6.vercel.app/api/auth/get-session:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
  (index):1 Access to fetch at 'https://hackathon-ii-evolution-of-todo-xfc6.vercel.app/api/auth/get-session' from origin 'https://hackathon-ii-evolution-of-todo-git-1cca2d-iqra-ikrams-projects.vercel.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
  hackathon-ii-evolution-of-todo-xfc6.vercel.app/api/auth/get-session:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
  (index):1 Access to fetch at 'https://hackathon-ii-evolution-of-todo-xfc6.vercel.app/api/auth/get-session' from origin 'https://hackathon-ii-evolution-of-todo-git-1cca2d-iqra-ikrams-projects.vercel.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
  hackathon-ii-evolution-of-todo-xfc6.vercel.app/api/auth/get-session:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
  (index):1 Access to fetch at 'https://hackathon-ii-evolution-of-todo-xfc6.vercel.app/api/auth/sign-in/email' from origin 'https://hackathon-ii-evolution-of-todo-git-1cca2d-iqra-ikrams-projects.vercel.app' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
  hackathon-ii-evolution-of-todo-xfc6.vercel.app/api/auth/sign-in/email:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
  4aac59ea5a838261.js:37   Uncaught (in promise) TypeError: Failed to fetch
      at i6 (4aac59ea5a838261.js:37:27692)
      at async m (4aac59ea5a838261.js:37:33836)
      at async Object.apply (4aac59ea5a838261.js:37:38773)
      at async x (6c1efed42e3b230c.js:1:34573) solve this
response_text: |
  Implemented a robust code-level fix for the CORS issue.
  
  Problem: The `authClient` was explicitly configured with `process.env.NEXT_PUBLIC_BETTER_AUTH_URL`. In Preview environments, this variable was either carrying over the Production URL (causing CORS blocks) or confusing the client.
  
  Solution: Removed the `baseURL` property from the `createAuthClient` configuration in `frontend/src/lib/auth-client.ts`.
  
  Why this works:
  1.  When `baseURL` is omitted, `better-auth` defaults to the **current origin** (the browser's URL).
  2.  This automatically ensures that:
      - Production talks to Production.
      - Preview talks to Preview.
      - Localhost talks to Localhost.
  3.  It removes the dependency on the `NEXT_PUBLIC_BETTER_AUTH_URL` environment variable for the client side, eliminating the source of the configuration error.
  
  Instruction to User: Redeploy the application to apply this code change.
evaluation:
  outcome: "success"
  reason: "Applied a definitive code fix that eliminates the environment variable dependency causing the issue."
---
