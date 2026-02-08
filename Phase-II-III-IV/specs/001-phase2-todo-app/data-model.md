# Data Model: Phase II Todo App

**Feature**: Phase II Todo Full-Stack Web Application

## Conceptual Model

### Entities

#### Task
Represents a single todo item.
- **Ownership**: Strictly belongs to one User (`owner_id`).
- **Lifecycle**: Created -> Updated/Completed -> Deleted.

#### User (External/Implicit)
Managed by Better Auth.
- **Role**: The Backend identifies users solely by the `sub` claim in the verified JWT.
- **Reference**: `Task.owner_id` stores the User's ID.

## Physical Schema (SQLModel)

### Table: `task`

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | UUID | No | Primary Key, Default: uuid4 |
| `title` | String | No | Task summary |
| `description` | String | Yes | Detailed notes |
| `is_completed` | Boolean | No | Default: `False` |
| `owner_id` | String | No | ID of the user who owns this task (Indexed) |
| `created_at` | DateTime | No | UTC Timestamp |
| `updated_at` | DateTime | No | UTC Timestamp |

### Indexes
- `ix_task_owner_id`: To optimize "Get my tasks" queries.

## Validation Rules

1. **Title**: Min length 1, Max length 100.
2. **Owner ID**: Must match the authenticated user's ID (enforced at API layer).
3. **Description**: Max length 1000.
