from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from pydantic import BaseModel
from typing import Optional, List
from src.core.database import get_session
from src.core.security import get_current_user_id
from src.services.chat_service import ChatService

from src.services.agent_service import agent_service
from src.models.chat import MessageRole, Conversation, Message

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None

class ChatResponse(BaseModel):
    response: str
    conversation_id: int

@router.post("/{user_id}/chat", response_model=ChatResponse)
async def chat(
    user_id: str,
    request: ChatRequest,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user_id)
):
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Forbidden")

    chat_service = ChatService(session)
    
    # 1. Get or Create Conversation
    if request.conversation_id:
        conversation = chat_service.get_conversation(request.conversation_id, user_id)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        conversation = chat_service.create_conversation(user_id)

    # 2. Add User Message
    chat_service.add_message(
        conversation_id=conversation.id,
        role=MessageRole.USER,
        content=request.message
    )

    # 3. Get History for Context
    history = chat_service.get_history(conversation.id)
    
    # Convert to OpenAI format
    messages = [{"role": msg.role.value, "content": msg.content} for msg in history]

    # 4. Get Agent Response
    # In future phases, agent_service will handle tools loop. For now, simple call.
    try:
        response_text = await agent_service.get_response(messages, user_id)
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Agent Error Details: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Agent error: {str(e)}")

    # 5. Add Assistant Message
    chat_service.add_message(
        conversation_id=conversation.id,
        role=MessageRole.ASSISTANT,
        content=response_text
    )

    return ChatResponse(response=response_text, conversation_id=conversation.id)

@router.get("/{user_id}/conversations", response_model=List[Conversation])
def list_conversations(
    user_id: str,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user_id)
):
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    chat_service = ChatService(session)
    return chat_service.get_user_conversations(user_id)

@router.get("/{user_id}/conversations/{conversation_id}/messages", response_model=List[Message])
def get_messages(
    user_id: str,
    conversation_id: int,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user_id)
):
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    chat_service = ChatService(session)
    conversation = chat_service.get_conversation(conversation_id, user_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
        
    return chat_service.get_history(conversation_id)
