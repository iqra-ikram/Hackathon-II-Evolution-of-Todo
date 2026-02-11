---
id: "002"
title: "Fix CORS by Scoping Env Vars"
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
  - "env-vars"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: []
tests_yaml: []
prompt_text: |
  hackathon-ii-evoluti…jects.vercel.app/:1 Access to fetch at 'https://hackathon-ii-evolution-of-todo-yoi6.vercel.app/api/auth/get-session' from origin 'https://hackathon-ii-evolution-of-todo-git-1cca2d-iqra-ikrams-projects.vercel.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
  
  hackathon-ii-evoluti…/auth/get-session:1 
   Failed to load resource: net::ERR_FAILED
  hackathon-ii-evoluti…jects.vercel.app/:1 Access to fetch at 'https://hackathon-ii-evolution-of-todo-yoi6.vercel.app/api/auth/get-session' from origin 'https://hackathon-ii-evolution-of-todo-git-1cca2d-iqra-ikrams-projects.vercel.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
  hackathon-ii-evoluti…/auth/get-session:1 
   Failed to load resource: net::ERR_FAILED
  hackathon-ii-evoluti…jects.vercel.app/:1 Access to fetch at 'https://hackathon-ii-evolution-of-todo-yoi6.vercel.app/api/auth/sign-in/email' from origin 'https://hackathon-ii-evolution-of-todo-git-1cca2d-iqra-ikrams-projects.vercel.app' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
  hackathon-ii-evoluti…uth/sign-in/email:1 
   Failed to load resource: net::ERR_FAILED
  55d4260c5716479d.js:37 
   
   Uncaught (in promise) TypeError: Failed to fetch
      at i6 (55d4260c5716479d.js:37:27692)
      at async m (55d4260c5716479d.js:37:33836)
      at async Object.apply (55d4260c5716479d.js:37:38773)
      at async x (6c1efed42e3b230c.js:1:34573)
  hackathon-ii-evoluti…jects.vercel.app/:1 Access to fetch at 'https://hackathon-ii-evolution-of-todo-yoi6.vercel.app/api/auth/get-session' from origin 'https://hackathon-ii-evolution-of-todo-git-1cca2d-iqra-ikrams-projects.vercel.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
  hackathon-ii-evoluti…/auth/get-session:1 
   Failed to load resource: net::ERR_FAILED
  signup:1 Access to fetch at 'https://hackathon-ii-evolution-of-todo-yoi6.vercel.app/api/auth/sign-up/email' from origin 'https://hackathon-ii-evolution-of-todo-git-1cca2d-iqra-ikrams-projects.vercel.app' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
  hackathon-ii-evoluti…uth/sign-up/email:1 
   Failed to load resource: net::ERR_FAILED
  55d4260c5716479d.js:37 
   
   Uncaught (in promise) TypeError: Failed to fetch
      at i6 (55d4260c5716479d.js:37:27692)
      at async m (55d4260c5716479d.js:37:33836)
      at async Object.apply (55d4260c5716479d.js:37:38773)
      at async f (cc7132a432ba41cf.js:1:34599) browser console gave me this error when im trying to login
response_text: |
  Diagnosed the CORS error as a result of the Preview environment using the Production URL for authentication. This cross-origin request is blocked because the server doesn't support wildcard origins with credentials.

  The solution is to scope the `NEXT_PUBLIC_BETTER_AUTH_URL` environment variable in Vercel to **Production only**.

  Instructions:
  1.  Vercel -> Settings -> Env Vars.
  2.  Edit `NEXT_PUBLIC_BETTER_AUTH_URL`.
  3.  Uncheck "Preview" and "Development".
  4.  Redeploy.
evaluation:
  outcome: "success"
  reason: "Provided correct configuration fix for Vercel environments."
---
