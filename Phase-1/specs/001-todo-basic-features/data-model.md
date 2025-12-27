# Data Model: Todo App Basic Features

## Entity: Task

Represents a single todo item within the application.

### Attributes:

*   **`id`**:
    *   **Type**: Integer
    *   **Description**: A unique identifier assigned to each task upon creation. This ID is immutable.
    *   **Constraints**: Must be a positive integer, unique across all tasks.
    *   **Example**: `1`, `2`, `3`

*   **`title`**:
    *   **Type**: String
    *   **Description**: A concise, descriptive name for the task.
    *   **Constraints**: Mandatory, cannot be empty. Maximum length 100 characters.
    *   **Example**: `"Buy groceries"`, `"Read a book"`

*   **`description`**:
    *   **Type**: String
    *   **Description**: Optional additional details or notes about the task.
    *   **Constraints**: Optional. Maximum length 500 characters.
    *   **Example**: `"Milk, eggs, bread, cheese"`, `""` (empty string if no description)

*   **`is_complete`**:
    *   **Type**: Boolean
    *   **Description**: Indicates whether the task has been completed.
    *   **Constraints**: Defaults to `False` upon creation.
    *   **Example**: `True`, `False`

### Relationships:

*   No direct relationships with other entities in this basic version.

### Validation Rules:

*   `title` must be provided and non-empty.
*   `id` must be a unique positive integer.
