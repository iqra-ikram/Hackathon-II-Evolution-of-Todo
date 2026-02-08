---
id: "027"
title: "Disable Scrolling on Auth Pages"
stage: "fix"
date: "2025-12-31"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "dynamic-dashboard"
branch: "main"
user: "Iqra7"
command: "all the things are good but we dont have to scroll login page and sign up page it will be on the main page"
labels:
  - "frontend"
  - "styling"
  - "ux"
  - "bugfix"
links:
  spec: "specs/002-dynamic-dashboard/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "frontend/src/app/page.tsx"
  - "frontend/src/app/signup/page.tsx"
tests: []
outcome: "Forced auth pages to be `h-screen` with `overflow-hidden`, preventing the blurred background from causing page scrolling."
evaluation: "success"
---

# Prompt

we dont have to scroll login page and sign up page

# Response

I have fixed the layout to **prevent scrolling**.

**Fix Applied:**
I changed the container from `min-h-screen` (which grows with content) to `h-screen` (fixed to viewport height) and added `overflow-hidden` and `absolute` positioning to the background.

**Result:**
The Login and Signup pages are now single-screen views. The blurred background is clipped, and the forms stay centered without any scrollbars.
