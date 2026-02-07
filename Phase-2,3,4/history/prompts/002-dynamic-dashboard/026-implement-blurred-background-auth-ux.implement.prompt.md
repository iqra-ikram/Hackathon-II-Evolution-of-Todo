---
id: "026"
title: "Implement Blurred Background Auth UX"
stage: "implement"
date: "2025-12-31"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "dynamic-dashboard"
branch: "main"
user: "Iqra7"
command: "show the login page first but on the background of the login page there will be an interface of the website but it will be blur"
labels:
  - "frontend"
  - "ux"
  - "auth"
  - "styling"
links:
  spec: "specs/002-dynamic-dashboard/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "frontend/src/app/page.tsx"
  - "frontend/src/app/signup/page.tsx"
  - "frontend/src/components/landing/LandingContent.tsx"
tests: []
outcome: "Implemented a 'locked' website experience where unauthenticated users see the landing page blurred in the background with a login/signup overlay."
evaluation: "success"
---

# Prompt

show the login page first but on the background of the login page there will be an interface of the website but it will be blur ... concept of user cant access the website without authentication

# Response

I have implemented the **Blurred "Locked" Interface**.

**New Experience:**
1.  **Visit `/`**: You will see the Website Interface in the background, but it is **blurred** and non-interactive.
2.  **Overlay**: A **Login Form** floats in the center, clearly indicating that authentication is required to access the content.
3.  **Sign Up**: Clicking "Create an account" takes you to the Signup screen, which preserves the **same blurred background** for a consistent feel.
4.  **Success**: Once you log in, the blur vanishes, and the website becomes fully interactive.

This creates a high-quality "teaser" effect that encourages users to sign in.
