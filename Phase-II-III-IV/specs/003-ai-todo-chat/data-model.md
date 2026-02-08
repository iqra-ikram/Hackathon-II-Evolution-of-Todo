# Data Model

## Entities

### User
*Managed by Better Auth (Schema external)*
- **id**: String (Primary Key)
- **email**: String
- **name**: String

### Task
- **id**: Integer (Primary Key, Auto-increment)
- **user_id**: String (Foreign Key -> User.id, Indexed)
- **title**: String (Required)
- **description**: String (Optional)
- **completed**: Boolean (Default: false)
- **created_at**: DateTime (Default: now)
- **updated_at**: DateTime (Default: now)

### Conversation
- **id**: Integer (Primary Key, Auto-increment)
- **user_id**: String (Foreign Key -> User.id, Indexed)
- **created_at**: DateTime (Default: now)
- **updated_at**: DateTime (Default: now)

### Message
- **id**: Integer (Primary Key, Auto-increment)
- **conversation_id**: Integer (Foreign Key -> Conversation.id, Indexed)
- **role**: String (Enum: "user", "assistant", "system", "tool")
- **content**: Text (JSON/String content)
- **tool_calls**: JSON (Optional, for assistant tool invocations)
- **tool_call_id**: String (Optional, for tool role messages)
- **created_at**: DateTime (Default: now)

## Relationships
- User (1) -> (Many) Task
- User (1) -> (Many) Conversation
- Conversation (1) -> (Many) Message
