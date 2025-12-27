# src/todo_app.py

import sys
import argparse # Added argparse import
import os
from src.task_manager import TaskManager
from src.models.task import Task
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.text import Text
from rich.prompt import Prompt, Confirm
from rich.align import Align

console = Console()

class TodoApp:
    def __init__(self, db_file=None):
        self.manager = TaskManager(db_file=db_file)
        self.cli_commands = {
            "add": self._cli_add_task,
            "view": self._cli_view_tasks,
            "complete": self._cli_complete_task,
            "update": self._cli_update_task,
            "delete": self._cli_delete_task,
            "reset-for-testing": self._reset_for_testing_command, # Re-added for CLI
        }
        self.interactive_commands = {
            "add": self._interactive_add_task,
            "view": self._interactive_view_tasks,
            "complete": self._interactive_complete_task,
            "update": self._interactive_update_task,
            "delete": self._interactive_delete_task,
            "help": self._print_help,
            "exit": self._exit_app,
        }

    def _display_app_heading(self):
        """Displays a prominent, colorful, and centered heading for the Todo App."""
        title_text = Text("Todo App", style="bold bright_white on blue")
        author_text = Text("Made by Iqra Ikram", style="italic yellow on dark_blue")

        heading_content = Text()
        heading_content.append(title_text)
        heading_content.append("\n") # Add a newline between title and author
        heading_content.append(author_text)

        heading_panel = Panel(
            Align.center(heading_content),
            title="[bold green]Welcome to the Todo Application![/bold green]",
            subtitle="[italic dim]Your personal task manager built with Rich by Iqra Ikram[/italic dim]",
            border_style="green",
            expand=True, # Allow panel to expand to fill width
            width=console.width
        )
        console.print(heading_panel)
        console.print("\n") # Add some space after the heading

    def _print_help(self, *args):
        """Displays all available commands for interactive mode using rich."""
        help_text = Text()
        help_text.append("Available commands:\n", style="bold light_green")
        help_text.append("  add <title> [-d <description>] - Add a new task\n", style="cyan")
        help_text.append("  view                          - View all tasks\n", style="green")
        help_text.append("  complete <id>                 - Mark a task as complete\n", style="magenta")
        help_text.append("  update <id> -t <title> -d <description> - Update a task\n", style="cyan")
        help_text.append("  delete <id>                   - Delete a task\n", style="green")
        help_text.append("  help                          - Show this help message\n", style="magenta")
        help_text.append("  exit                          - Exit the application\n", style="cyan")
        console.print(Panel(help_text, title="[bold bright_yellow]Todo App Help[/bold bright_yellow]", border_style="bright_yellow"))

    def _exit_app(self, *args):
        """Exits the application."""
        console.print("[bold magenta]Goodbye![/bold magenta]")
        sys.exit(0)

    def _parse_interactive_input(self, user_input):
        parts = user_input.strip().split()
        command = parts[0]
        args = parts[1:]
        
        # Basic parsing for description and title flags
        kwargs = {}
        i = 0
        while i < len(args):
            if args[i] == '-d' and i + 1 < len(args):
                # Collect multi-word description
                desc_words = []
                i += 1
                while i < len(args) and not args[i].startswith('-'):
                    desc_words.append(args[i])
                    i += 1
                kwargs['description'] = " ".join(desc_words)
            elif args[i] == '-t' and i + 1 < len(args):
                 # Collect multi-word title
                title_words = []
                i += 1
                while i < len(args) and not args[i].startswith('-'):
                    title_words.append(args[i])
                    i += 1
                kwargs['title'] = " ".join(title_words)
            else:
                if command == 'add' and 'title' not in kwargs:
                    # For 'add', collect all preceding unflagged arguments as title
                    title_words = []
                    while i < len(args) and not args[i].startswith('-'):
                        title_words.append(args[i])
                        i += 1
                    kwargs['title'] = " ".join(title_words)
                    # Decrement i because the outer loop will increment it again,
                    # and we've already processed these arguments.
                    i -= 1
                elif 'id' not in kwargs and 'title' not in kwargs:
                    if command in ['complete', 'delete', 'update']:
                        kwargs['id'] = args[i]
                    # This case for 'add' should now be covered by the previous if
                i += 1

        # This block is mostly redundant now, but let's keep the logic clean
        # If the title was collected directly as positional args, it's already set
        if command == 'add' and 'title' not in kwargs and args:
            # Fallback for when no flags were used and title is still unset
            kwargs['title'] = " ".join(args)
        
        return command, kwargs


    def _do_add_task(self, title, description=""):
        try:
            task = self.manager.add_task(title=title, description=description)
            console.print(f"[bold green]Task '{task.title}' added with ID: {task.id}[/bold green]")
            if task.description:
                console.print(f"  [italic dim cyan]Description: {task.description}[/italic dim cyan]")
        except ValueError as e:
            console.print(f"[red]Error: {e}[/red]")

    def _cli_add_task(self, args):
        self._do_add_task(args.title, args.description)

    def _interactive_add_task(self, **kwargs):
        title = kwargs.get('title')
        description = kwargs.get('description', "")
        if not title:
            console.print("[red]Error: Title is required for adding a task.[/red]")
            return
        self._do_add_task(title, description)

    def _do_view_tasks(self):
        tasks = self.manager.get_all_tasks()
        if not tasks:
            console.print("[yellow]No tasks found.[/yellow]")
            return

        table = Table(title="[bold bright_blue]Your Current Todo List[/bold bright_blue]", show_header=True, header_style="bold bright_cyan on dark_blue", border_style="bright_black")
        table.add_column("ID", style="italic yellow", width=4)
        table.add_column("Status", style="bold", width=7)
        table.add_column("Title", style="bright_white", min_width=20, max_width=50)
        table.add_column("Description", style="green", max_width=80)

        for task in tasks:
            status_text = "[green]:heavy_check_mark:[/green]" if task.is_complete else "[red]:heavy_multiplication_x:[/red]"
            row_style = "dim strike" if task.is_complete else ""
            table.add_row(
                str(task.id),
                status_text,
                task.title,
                task.description or "",
                style=row_style
            )
        
        console.print(table)

    def _cli_view_tasks(self, args):
        self._do_view_tasks()

    def _interactive_view_tasks(self, **kwargs):
        self._do_view_tasks()

    def _do_complete_task(self, task_id_str):
        try:
            task_id = int(task_id_str)
            task = self.manager.get_task_by_id(task_id)
            if task:
                if task.is_complete:
                    console.print(f"[bold yellow]Task ID {task.id} is already complete.[/bold yellow]")
                else:
                    self.manager.update_task(task_id, is_complete=True)
                    console.print(f"[bold green]Task ID {task_id} marked as complete.[/bold green]")
            else:
                console.print(f"[red]Error: Task with ID {task_id} not found.[/red]")
        except ValueError:
            console.print("[red]Error: Invalid task ID. Must be an integer.[/red]")

    def _cli_complete_task(self, args):
        self._do_complete_task(args.id)

    def _interactive_complete_task(self, **kwargs):
        task_id_str = kwargs.get('id')
        if not task_id_str:
            console.print("[red]Error: Task ID is required.[/red]")
            return
        self._do_complete_task(task_id_str)

    def _do_update_task(self, task_id_str, title=None, description=None):
        try:
            task_id = int(task_id_str)
        except ValueError:
            console.print("[red]Error: Invalid task ID. Must be an integer.[/red]")
            return

        if title is None and description is None:
            console.print("[red]Error: No update arguments provided. Use -t <title> or -d <description>.[/red]")
            return

        try:
            task = self.manager.get_task_by_id(task_id)
            if task:
                updated_task = self.manager.update_task(
                    task_id,
                    title=title,
                    description=description
                )
                if updated_task:
                    console.print(f"[bold green]Task ID {task_id} updated.[/bold green]")
                else:
                    console.print(f"[red]Error: Could not update task ID {task_id}.[/red]")
            else:
                console.print(f"[red]Error: Task with ID {task_id} not found.[/red]")
        except ValueError as e:
            console.print(f"[red]Error: {e}[/red]")

    def _cli_update_task(self, args):
        self._do_update_task(args.id, args.title, args.description)

    def _interactive_update_task(self, **kwargs):
        task_id_str = kwargs.get('id')
        if not task_id_str:
            console.print("[red]Error: Task ID is required.[/red]")
            return
        title = kwargs.get('title')
        description = kwargs.get('description')
        self._do_update_task(task_id_str, title, description)

    def _do_delete_task(self, task_id_str):
        try:
            task_id = int(task_id_str)
            
            if Confirm.ask(f"[yellow]Are you sure you want to delete task ID {task_id}?[/yellow]", default=False):
                if self.manager.delete_task(task_id):
                    console.print(f"[bold green]Task ID {task_id} deleted.[/bold green]")
                else:
                    console.print(f"[red]Error: Task with ID {task_id} not found.[/red]")
            else:
                console.print("[bold bright_black]Deletion cancelled.[/bold bright_black]")
        except ValueError:
            console.print("[red]Error: Invalid task ID. Must be an integer.[/red]")

    def _cli_delete_task(self, args):
        self._do_delete_task(args.id)

    def _interactive_delete_task(self, **kwargs):
        task_id_str = kwargs.get('id')
        if not task_id_str:
            console.print("[red]Error: Task ID is required.[/red]")
            return
        self._do_delete_task(task_id_str)

    def _reset_for_testing_command(self, args=None):
        """Handles the 'reset-for-testing' command."""
        self.manager._reset_for_testing()
    def _run_interactive_mode(self):
        """Main interactive loop for the Todo application."""
        console.print("[bold green]Type '[cyan]help[/cyan]' for a list of commands.[/bold green]")
        
        while True:
            try:
                user_input = Prompt.ask("[bold magenta]todo[/bold magenta]>[dim] [/dim]").strip()
                if not user_input:
                    continue

                command_name, kwargs = self._parse_interactive_input(user_input)
                
                if command_name in self.interactive_commands:
                    self.interactive_commands[command_name](**kwargs)
                else:
                    console.print(f"[bold red]Unknown command: '{command_name}'.[/bold red] Type '[cyan]help[/cyan]' for a list of commands.")

            except (EOFError, KeyboardInterrupt):
                self._exit_app()

    def _run_cli_mode(self):
        """Handles command-line arguments using argparse."""
        import argparse # Import argparse here to avoid circular dependencies and only when needed

        parser = argparse.ArgumentParser(description="A simple command-line Todo application.")
        subparsers = parser.add_subparsers(dest="command", help="Available commands")

        add_parser = subparsers.add_parser("add", help="Add a new task")
        add_parser.add_argument("title", type=str, help="The title of the task")
        add_parser.add_argument("-d", "--description", type=str, default="", help="A longer description for the task")
        add_parser.set_defaults(func=self._cli_add_task)

        view_parser = subparsers.add_parser("view", help="View all tasks")
        view_parser.set_defaults(func=self._cli_view_tasks)

        complete_parser = subparsers.add_parser("complete", help="Mark a task as complete")
        complete_parser.add_argument("id", type=str, help="The ID of the task to mark complete")
        complete_parser.set_defaults(func=self._cli_complete_task)

        update_parser = subparsers.add_parser("update", help="Update an existing task")
        update_parser.add_argument("id", type=str, help="The ID of the task to update")
        update_parser.add_argument("-t", "--title", type=str, default=None, help="New title for the task")
        update_parser.add_argument("-d", "--description", type=str, default=None, help="New description for the task")
        update_parser.set_defaults(func=self._cli_update_task)

        delete_parser = subparsers.add_parser("delete", help="Delete a task")
        delete_parser.add_argument("id", type=str, help="The ID of the task to delete")
        delete_parser.set_defaults(func=self._cli_delete_task)

        reset_parser = subparsers.add_parser("reset-for-testing", help=argparse.SUPPRESS)
        reset_parser.set_defaults(func=self._reset_for_testing_command)

        args = parser.parse_args()

        if args.command:
            args.func(args)
        else:
            parser.print_help()
            sys.exit(1)


def main():
    db_file = os.environ.get("TODO_APP_TEST_DB_FILE")
    if not db_file:
        # Default to tasks.json in the current working directory
        db_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tasks.json')
    app = TodoApp(db_file=db_file)
    app._display_app_heading()

    if len(sys.argv) > 1: # Check if arguments are provided
        app._run_cli_mode()
    else:
        app._run_interactive_mode()

if __name__ == "__main__":
    main()
