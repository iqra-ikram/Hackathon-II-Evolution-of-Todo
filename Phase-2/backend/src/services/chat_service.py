from datetime import datetime
from sqlmodel import Session, select
from src.models.chat import Conversation, Message, MessageRole

class ChatService:
    def __init__(self, session: Session):
        self.session = session

    def create_conversation(self, user_id: str) -> Conversation:
        conversation = Conversation(user_id=user_id)
        self.session.add(conversation)
        self.session.commit()
        self.session.refresh(conversation)
        return conversation

    def get_conversation(self, conversation_id: int, user_id: str) -> Conversation | None:
        statement = select(Conversation).where(
            Conversation.id == conversation_id,
            Conversation.user_id == user_id
        )
        return self.session.exec(statement).first()
        
    def get_user_conversations(self, user_id: str) -> list[Conversation]:
        statement = select(Conversation).where(Conversation.user_id == user_id).order_by(Conversation.updated_at.desc())
        return self.session.exec(statement).all()

    def add_message(self, conversation_id: int, role: MessageRole, content: str, tool_calls: list = None, tool_call_id: str = None) -> Message:
        message = Message(
            conversation_id=conversation_id,
            role=role,
            content=content,
            tool_calls=tool_calls,
            tool_call_id=tool_call_id
        )
        self.session.add(message)
        
        # Update conversation updated_at
        conversation = self.session.get(Conversation, conversation_id)
        if conversation:
            conversation.updated_at = datetime.utcnow()
            self.session.add(conversation)
            
        self.session.commit()
        self.session.refresh(message)
        return message

    def get_history(self, conversation_id: int) -> list[Message]:
        statement = select(Message).where(Message.conversation_id == conversation_id).order_by(Message.created_at.asc())
        return self.session.exec(statement).all()
