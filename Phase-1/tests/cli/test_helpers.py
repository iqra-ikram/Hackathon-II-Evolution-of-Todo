# tests/cli/test_helpers.py

import subprocess
import os

DB_FILE = "test_todo_app.db.json"

def run_cli_command(command_args):
    # Construct the command to run the todo_app.py script
    python_executable = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", ".venv", "Scripts", "python.exe")
    
    if not os.path.exists(python_executable):
        python_executable = "python"

    env = os.environ.copy()
    env["TODO_APP_TEST_DB_FILE"] = DB_FILE

    cmd = [python_executable, "-m", "src.todo_app"] + command_args
    result = subprocess.run(cmd, capture_output=True, text=True, check=False, env=env)
    return result

def setup_test_db():
    if os.path.exists(DB_FILE):
        os.remove(DB_FILE)