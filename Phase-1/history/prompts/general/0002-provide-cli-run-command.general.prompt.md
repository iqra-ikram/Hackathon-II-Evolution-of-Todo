---
id: 2
title: Provide CLI Run Command
stage: general
date_iso: 2025-12-27
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: iqra
command: none
labels: ["cli", "python", "run-command"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - history/prompts/general/0002-provide-cli-run-command.general.prompt.md
tests_yaml:
  - .venv\Scripts\python -m src.todo_app --help
---

## PROMPT_TEXT
i made a cli baesd todo app give me command to run it on cli

## RESPONSE_TEXT
To run your CLI Todo app, use the following command from the project root:

```bash
python -m src.todo_app [command]
```

### Examples:
- **View all tasks:** `python -m src.todo_app view`
- **Add a task:** `python -m src.todo_app add "My Task"`
- **Help:** `python -m src.todo_app --help`

> [!NOTE]
> Since the app is structured as a package, using the `-m` flag is the correct way to run it to ensure `src` is in the Python path.

## OUTCOME
Provided the user with the correct CLI command and verified it against the codebase. Created a walkthrough artifact for future reference.
