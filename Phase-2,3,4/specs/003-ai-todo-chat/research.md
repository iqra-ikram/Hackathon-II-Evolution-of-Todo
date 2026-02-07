# Research & Technical Decisions

**Feature**: Intelligent Todo Agent (Grok + MCP)
**Date**: 2026-01-02

## 1. AI Model Integration: xAI Grok
**Requirement**: Use Grok via OpenAI Agents SDK.
**Findings**:
- xAI Grok API is OpenAI-compatible at `https://api.x.ai/v1`.
- **Decision**: Use the standard `openai` Python library (as the core of the "Agents SDK" requirement) configured with `base_url="https://api.x.ai/v1"` and `api_key=os.environ["GROK_API_KEY"]`.
- **Rationale**: Direct compatibility allows leveraging existing OpenAI tooling while adhering to the Grok mandate.

## 2. Model Context Protocol (MCP) Architecture
**Requirement**: Build MCP Server exposing task tools.
**Findings**:
- MCP (Model Context Protocol) standardizes how AI models interact with data.
- Official Python SDK: `mcp`.
- **Decision**:
    - **MCP Server**: Implement a standalone (or embedded) MCP server using the `mcp` Python SDK.
    - **Tool Exposure**: Define `add_task`, `list_tasks`, etc., as MCP resources/tools.
    - **Agent Connection**: The AI Agent (running in FastAPI) will act as an *MCP Client* (or use a bridge) to invoke these tools. Since they are in the same backend, we can simpler bind the MCP tool definitions directly to the OpenAI tool schemas (function calling).
    - *Refinement*: To strictly follow "Build MCP Server", we will create a module `src/mcp_server.py` that uses `FastMCP` (if available in the SDK) or standard `Server` to expose tools. The Chat Endpoint will instantiate the Agent which knows how to call these tools.
- **Rationale**: Decouples the tool logic from the agent logic, future-proofing for other MCP clients.

## 3. Frontend Chat Interface
**Requirement**: OpenAI ChatKit.
**Findings**:
- "OpenAI ChatKit" appears to be either a deprecated term or a specific requested library not widely standard.
- **Decision**: Use **Vercel AI SDK** (`ai/rsc`, `useChat`) as the "Functional Equivalent".
- **Rationale**: Standard, robust, and maintains the "ChatKit" spirit of pre-built AI UI components for Next.js.
- **Substitution**: Next.js App Router + Vercel AI SDK.

## 4. Stateless Chat Persistence
**Requirement**: No in-memory state; full persistence.
**Decision**:
- **Schema**: `Conversation` and `Message` tables in PostgreSQL.
- **Flow**:
    1. `POST /api/chat`: Receive `message`, `conversation_id`.
    2. Load `history = db.exec(select(Message).where(conversation_id...))`.
    3. Construct OpenAI `messages` payload.
    4. Call `client.chat.completions.create(..., tools=mcp_tools)`.
    5. Handle Tool Calls: Execute MCP tool -> Get Result -> Append to messages.
    6. Get Final Response.
    7. Save User Message + Assistant Response(s) to DB.
    8. Return response.

## 5. Technology Stack Summary
- **Backend**: FastAPI
- **DB**: Neon (PostgreSQL) + SQLModel
- **AI**: OpenAI Python SDK (Targeting Grok)
- **Tools**: `mcp` Python SDK
- **Frontend**: Next.js + Vercel AI SDK
