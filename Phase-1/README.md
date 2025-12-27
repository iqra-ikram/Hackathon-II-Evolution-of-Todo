# ✨ Python Todo CLI App: Beautifully Interactive Task Management ✨

A powerful and visually stunning command-line Todo application designed for an exceptional user experience. Built with Python and enhanced by the `rich` library, this app brings vibrant colors, interactive prompts, and elegant tables directly to your terminal, making task management a delightful experience.

## 🚀 Features

*   **Eye-catching Interface**: Enjoy a beautifully crafted UI with colorful headings, tables, and prompts powered by the `rich` library.
*   **Interactive Mode**: Engage with your tasks in a continuous, responsive interactive session.
*   **CLI Mode**: Execute commands directly from your terminal for quick actions.
*   **Add Tasks**: Create new tasks with a title and an optional detailed description.
*   **View Tasks**: Display all your tasks in a clear, color-coded, and well-structured table. Completed tasks are visibly dim and struck-through.
*   **Complete Tasks**: Mark tasks as done with satisfying visual feedback.
*   **Update Tasks**: Modify task titles and descriptions with ease.
*   **Delete Tasks**: Remove tasks after an interactive confirmation to prevent accidental deletions.
*   **In-memory Storage**: Tasks are stored in a `tasks.json` file, ensuring persistence across sessions.

## 🎨 Eye-catching Interface

The Todo app boasts a modern and intuitive terminal interface:

*   **Dynamic Heading**: A prominent, centered heading "Todo App" with "Made by Iqra Ikram" greets you upon startup, providing a personalized and professional touch.
*   **Colorful Tables**: Task lists are presented in elegant tables with distinct colors for IDs, statuses, titles, and descriptions.
*   **Status Indicators**: Clearly see task status with green checkmarks (✅) for completed tasks and red crosses (❌) for incomplete ones.
*   **Styled Feedback**: Every action (add, complete, update, delete, error) provides clear, color-coded messages for immediate understanding.
*   **Interactive Prompts**: User inputs are guided by styled prompts, making the experience seamless.
*   **Help Panel**: A well-organized help message is presented within a colorful panel for easy readability.

## 🛠️ Technology Stack

*   **Python 3.13+**: The core language for the application logic.
*   **`rich` Library**: For all terminal rendering, styling, and interactivity.
*   **`argparse`**: For robust command-line argument parsing.

## ⚡ Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/iqra-ikram/Hackathon-2.git
    cd Hackathon-2
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv .venv
    # On Windows:
    .venv\Scripts\activate
    # On macOS/Linux:
    source .venv/bin/activate
    ```

3.  **Install dependencies:**
    The application currently relies on the `rich` library. While a `requirements.txt` is not strictly maintained for just one dependency, you can install it directly:
    ```bash
    pip install rich
    ```
    *(Note: If you are using `uv`, you might use `uv pip install rich`)*

## 🚀 How to Run

The application stores tasks in a `tasks.json` file in the project root directory.

### 1. Interactive Mode (Recommended for full experience)

To start the app in interactive mode, simply run the `todo.py` script without any arguments:

```bash
python todo.py
```

Upon launch, you'll be greeted by the custom heading, followed by a `todo> ` prompt. Type `help` to explore commands.

**Example Interactive Session (What you'll see):**

```
# When you run 'python todo.py':

╭─────────────────────────────────── Welcome to the Todo Application! ────────────────────────────────────╮
│                                                Todo App                                               │
│                                           Made by Iqra Ikram                                          │
╰─ Your personal task manager built with Rich by Iqra Ikram ─╯


Type 'help' for a list of commands.
todo> help
╭──────────────────────────────────────────── Todo App Help ─────────────────────────────────────────────╮
│ Available commands:                                                                                    │
│   add <title> [-d <description>] - Add a new task                                                      │
│   view                          - View all tasks                                                       │
│   complete <id>                 - Mark a task as complete                                              │
│   update <id> -t <title> -d <description> - Update a task                                              │
│   delete <id>                   - Delete a task                                                        │
│   help                          - Show this help message                                               │
│   exit                          - Exit the application                                                 │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────╯
todo> add "Plan hackathon project" -d "Outline phases, tasks, and technologies."
Task 'Plan hackathon project' added with ID: 1.
  Description: Outline phases, tasks, and technologies.
todo> add "Write README"
Task 'Write README' added with ID: 2.
todo> view
                              Your Current Todo List
┏━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ID   ┃ Status  ┃ Title                           ┃ Description                   ┃
┡━━━━━━╇━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ 1    │ ❌      │ Plan hackathon project          │ Outline phases, tasks, and    │
│      │         │                                 │ technologies.                 │
│ 2    │ ❌      │ Write README                    │                               │
└──────┴─────────┴─────────────────────────────────┴───────────────────────────────┘
todo> complete 1
Task ID 1 marked as complete.
todo> view
                              Your Current Todo List
┏━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ID   ┃ Status  ┃ Title                           ┃ Description                   ┃
┡━━━━━━╇━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ 1    │ ✅      │ Plan hackathon project          │ Outline phases, tasks, and    │
│      │         │                                 │ technologies.                 │
│ 2    │ ❌      │ Write README                    │                               │
└──────┴─────────┴─────────────────────────────────┴───────────────────────────────┘
todo> exit
Goodbye!
```

### 2. CLI Mode

For single-command execution, provide the command and its arguments directly:

*   **Add a task:**
    ```bash
    python todo.py add "Submit project proposal" -d "Deadline is tomorrow!"
    ```
    *(Output: Task 'Submit project proposal' added with ID: [ID].  Description: Deadline is tomorrow!)*

*   **View all tasks:**
    ```bash
    python todo.py view
    ```
    *(Output: A colorful table of your tasks similar to the interactive view.)*

*   **Mark a task as complete:**
    ```bash
    python todo.py complete [TASK_ID]
    ```
    *(Output: Task ID [TASK_ID] marked as complete.)*

*   **Update a task:**
    ```bash
    python todo.py update [TASK_ID] -t "Finalize project submission" -d "Double-check all requirements."
    ```
    *(Output: Task ID [TASK_ID] updated.)*

*   **Delete a task:**
    ```bash
    python todo.py delete [TASK_ID]
    ```
    *(Output: Task ID [TASK_ID] deleted. (Note: In CLI mode, deletion is direct without confirmation prompt.)*

## Made by

✨ Iqra Ikram ✨