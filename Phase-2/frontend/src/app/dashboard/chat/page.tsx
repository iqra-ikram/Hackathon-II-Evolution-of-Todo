import ChatInterface from "@/components/chat/ChatInterface";

export default function ChatPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black">AI Task Assistant</h1>
      <div className="max-w-4xl mx-auto">
        <ChatInterface />
      </div>
    </div>
  );
}
