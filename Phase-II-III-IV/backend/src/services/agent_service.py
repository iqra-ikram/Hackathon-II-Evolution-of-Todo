import json
from openai import AsyncOpenAI
from src.core.config import settings
from src.services.mcp_server import mcp_server, user_id_var

class AgentService:
    def __init__(self):
        self.client = AsyncOpenAI(
            api_key=settings.GEMINI_API_KEY,
            base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
        )
        self.model_name = "gemini-flash-lite-latest" 

    async def get_response(self, messages: list, user_id: str) -> str:
        # Set user context
        token = user_id_var.set(user_id)
        
        # Prepend System Prompt
        system_prompt = {
            "role": "system",
            "content": "You are an intelligent Task Management Assistant. You help users manage their todo list. "
                       "When adding tasks, ask for clarification if needed. "
                       "When listing tasks, present them clearly. "
                       "Always use the available tools to perform actions. "
                       "If a user asks to update, complete, or delete a task by name (e.g., 'mark meeting as done'), "
                       "use the `search_tasks` tool to find the task ID first, then proceed with the action. "
                       "If a user asks to do something you can't do with tools, explain politely."
        }
        if not messages or messages[0].get("role") != "system":
            messages.insert(0, system_prompt)
        
        try:
            # 1. Get MCP Tools
            mcp_tools = await mcp_server.get_tools()
            openai_tools = [
                {
                    "type": "function",
                    "function": {
                        "name": tool.name,
                        "description": tool.description,
                        "parameters": tool.inputSchema
                    }
                }
                for tool in mcp_tools
            ]
            
            # 2. Call LLM Loop
            # Ensure tools list is not empty
            tools_arg = openai_tools if openai_tools else None
            
            max_iterations = 5
            iteration = 0
            
            while iteration < max_iterations:
                print(f"DEBUG: Sending to LLM. Model: {self.model_name} Iteration: {iteration}")
                
                try:
                    response = await self.client.chat.completions.create(
                        model=self.model_name,
                        messages=messages,
                        tools=tools_arg,
                        tool_choice="auto" if tools_arg else None
                    )
                except Exception as e:
                    print(f"DEBUG: LLM Call Failed: {str(e)}")
                    raise e
                
                response_message = response.choices[0].message
                print(f"DEBUG: LLM Response: {response_message.content} ToolCalls: {response_message.tool_calls}")
                
                # Ensure content is not None
                if response_message.content is None:
                    response_message.content = ""

                # If no tool calls, we are done
                if not response_message.tool_calls:
                    return response_message.content

                # Handle Tool Calls
                messages.append(response_message)
                
                for tool_call in response_message.tool_calls:
                    function_name = tool_call.function.name
                    function_args = json.loads(tool_call.function.arguments)
                    
                    # Execute tool via MCP Server
                    try:
                        result = await mcp_server.execute_tool(function_name, function_args)
                        # Extract text content
                        content = result[0].text if result else "Success"
                    except Exception as e:
                        content = f"Error: {str(e)}"
                        
                    messages.append({
                        "tool_call_id": tool_call.id,
                        "role": "tool",
                        "name": function_name,
                        "content": content,
                    })
                
                iteration += 1
            
            return "I apologize, but I couldn't complete the task within the limit."
            
        finally:
            user_id_var.reset(token)

agent_service = AgentService()