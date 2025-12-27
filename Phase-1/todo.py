#!/usr/bin/env python
# todo.py

import sys
import os

# Ensure the root directory is in the Python path so 'src' can be imported
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from src.todo_app import main

if __name__ == "__main__":
    main()
