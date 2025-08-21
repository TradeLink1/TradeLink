import { useState } from "react";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
}

interface ChatMessage {
  id: number;
  sender: "me" | "them";
  text: string;
}

const Messages = () => {
  const conversations: Conversation[] = [
    { id: 1, name: "Tobi Aluko", lastMessage: "Is this product available?" },
    { id: 2, name: "Emeka Uche", lastMessage: "Can you deliver tomorrow?" },
    { id: 3, name: "Amina Abubakar", lastMessage: "What’s your best price?" },
  ];

  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [chatHistory, setChatHistory] = useState<Record<number, ChatMessage[]>>({
    1: [{ id: 1, sender: "them", text: "Is this product available?" }],
    2: [{ id: 1, sender: "them", text: "Can you deliver tomorrow?" }],
    3: [{ id: 1, sender: "them", text: "What’s your best price?" }],
  });
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: "me",
      text: message,
    };

    setChatHistory((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage],
    }));

    setMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-100px)] shadow-md rounded overflow-hidden max-w-[1200px]">
  
      <aside
        className={`w-full md:w-1/3 border-r border-[#d6d6d6] shadow-lg p-4 overflow-y-auto  transition-transform duration-300
          ${selectedChat ? "hidden md:block" : "block"}`}
      >
        <h2 className="text-xl text-[#f89216] font-bold mb-4">Messages</h2>
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => setSelectedChat(conv)}
            className={`p-3 rounded cursor-pointer mb-2 transition  ${
              selectedChat?.id === conv.id
                ? "bg-orange-100 border-l-4 border-[#f89216]"
                : "hover:bg-gray-100"
            }`}
          >
            <p className="font-semibold text-[#30ac57]">{conv.name}</p>
            <p className="text-sm text-[#333333] truncate">{conv.lastMessage}</p>
          </div>
        ))}
      </aside>

      <main
        className={`flex-1 flex flex-col bg-orange-200 ${
          !selectedChat ? "hidden md:flex" : "flex"
        }`}
      >
        {selectedChat ? (
          <>
            
            <header className="p-4 border-b border-[#d6d6d6] font-semibold bg-[#fbf2e7] shadow-sm flex items-center gap-3 text-[#f89216]">
              
              <button
                className="md:hidden text-orange-500 font-bold"
                onClick={() => setSelectedChat(null)}
              >
                ← Back
              </button>
              <span>{selectedChat.name}</span>
            </header>

          
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatHistory[selectedChat.id]?.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <p
                    className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                      msg.sender === "me"
                        ? "bg-[#f89216] text-white"
                        : "bg-[#fbf2e7] text-[#333333]"
                    }`}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Input */}
            <footer className="p-4 border-t border-[#d6d6d6] flex gap-2 bg-[#fbf2ef]">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border border-[#333333] rounded-full px-4 py-2 
                           focus:outline-none focus:ring-0 
                           focus:shadow-md focus:shadow-gray-300"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSend}
                className="bg-[#30ac57] hover:bg-orange-600 text-white px-5 py-2 rounded-full transition"
              >
                Send
              </button>
            </footer>
          </>
        ) : (
          <p className="m-auto text-gray-500 hidden md:block">
            Select a conversation to start chatting
          </p>
        )}
      </main>
    </div>
  );
};

export default Messages;
