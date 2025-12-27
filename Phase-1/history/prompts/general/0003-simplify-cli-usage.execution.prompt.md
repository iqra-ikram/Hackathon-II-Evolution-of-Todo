---
id: 3
title: Simplify CLI Usage
stage: execution
date_iso: 2025-12-27
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: iqra
command: none
labels: ["cli", "python", "simplification"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - todo.py
  - README.md
  - history/prompts/general/0003-simplify-cli-usage.execution.prompt.md
tests_yaml:
  - .venv\Scripts\python todo.py --help
---

## PROMPT_TEXT
its bit confusing make it easy to use

## RESPONSE_TEXT
I've simplified the CLI usage by creating a root entry point script `todo.py`. You can now run the app more naturally:

```bash
python todo.py [command]
```

I also updated the `README.md` with these simplified instructions.

## OUTCOME
Created `todo.py` and updated `README.md` to provide a much more user-friendly way to interact with the CLI app.
