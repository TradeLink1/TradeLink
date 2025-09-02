"use client"

import { useState, useEffect } from "react"
import { FiSend } from "react-icons/fi"
import { FiArrowLeft } from "react-icons/fi"
import { FiMessageSquare } from "react-icons/fi"
import api from "../../api/axios"


interface Conversation {
  id: number
  name: string
  lastMessage: string
  userId?: string
  unreadCount?: number
}

interface ChatMessage {
  id: number
  sender: "me" | "them"
  text: string
  messageId?: string
  isRead?: boolean
}

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null)
  const [chatHistory, setChatHistory] = useState<Record<number, ChatMessage[]>>({})
  const [message, setMessage] = useState("")
  const [sendingMessage, setSendingMessage] = useState(false)

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      setLoading(true)
      const response = await api.get("/api/v1/messages/get/conversations")
      setConversations(response.data.conversations || [])
      setError(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error fetching conversations:", err)
      setError("Failed to load conversations")
      // Fallback to mock data if API fails
      setConversations([
        { id: 1, name: "Tobi Aluko", lastMessage: "Is this product available?" },
        { id: 2, name: "Emeka Uche", lastMessage: "Can you deliver tomorrow?" },
        { id: 3, name: "Amina Abubakar", lastMessage: "What's your best price?" },
      ])
    } finally {
      setLoading(false)
    }
  }

  const fetchConversationMessages = async (userId: string) => {
    try {
      const response = await api.get(`/api/v1/messages/get/all/conversations/${userId}`)
      const messages = response.data.messages || []

      // Transform API response to match component structure
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transformedMessages = messages.map((msg: any) => ({
        id: msg._id || msg.id,
        sender: msg.senderId === "currentUserId" ? "me" : "them", // You'll need to replace 'currentUserId' with actual user ID
        text: msg.content || msg.text,
        messageId: msg._id,
        isRead: msg.isRead,
      }))

      setChatHistory((prev) => ({
        ...prev,
        [selectedChat?.id || 0]: transformedMessages,
      }))
    } catch (err) {
      console.error("Error fetching conversation messages:", err)
    }
  }

  const markMessageAsRead = async (messageId: string) => {
    try {
      await api.patch(`/api/v1/messages/read/${messageId}`)
    } catch (err) {
      console.error("Error marking message as read:", err)
    }
  }

  const handleSend = async () => {
    if (!message.trim() || !selectedChat || sendingMessage) return

    setSendingMessage(true)

    try {
      const response = await api.post("/api/v1/messages/send", {
        recipientId: selectedChat.userId,
        content: message,
        conversationId: selectedChat.id,
      })

      const newMessage: ChatMessage = {
        id: response.data.message?.id || Date.now(),
        sender: "me",
        text: message,
        messageId: response.data.message?.id,
        isRead: false,
      }

      setChatHistory((prev) => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage],
      }))

      setMessage("")

      // Refresh conversations to update last message
      fetchConversations()
    } catch (err: unknown) {
      console.error("Error sending message:", err)
      alert("Failed to send message. Please try again.")
    } finally {
      setSendingMessage(false)
    }
  }

  const handleSelectConversation = async (conv: Conversation) => {
    setSelectedChat(conv)

    if (conv.userId) {
      await fetchConversationMessages(conv.userId)
    }

    // Mark unread messages as read
    const unreadMessages = chatHistory[conv.id]?.filter((msg) => !msg.isRead && msg.sender === "them")
    if (unreadMessages?.length) {
      unreadMessages.forEach((msg) => {
        if (msg.messageId) {
          markMessageAsRead(msg.messageId)
        }
      })
    }
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-100px)] shadow-lg rounded-[30px] overflow-hidden max-w-[1200px] border border-gray-200 bg-white items-center justify-center">
        <p className="text-gray-500">Loading conversations...</p>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-100px)] shadow-lg rounded-[30px] overflow-hidden max-w-[1200px] border border-gray-200 bg-white">
      {/* Sidebar */}
      <aside
        className={`w-full md:w-1/3 border-r border-gray-200 bg-[#ffffff] p-6 overflow-y-auto 
          transition-transform duration-300 ${selectedChat ? "hidden md:block" : "block"}`}
      >
        <h2 className="text-xl text-[#333333] font-semibold mb-4 flex items-center gap-2">
          <FiMessageSquare color="#F89216" /> Messages
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
            <button onClick={fetchConversations} className="text-red-700 underline text-sm mt-1">
              Retry
            </button>
          </div>
        )}

        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => handleSelectConversation(conv)}
            className={`p-3 rounded-lg cursor-pointer mb-2 transition-all 
              ${selectedChat?.id === conv.id ? "bg-[#f89216]/10 border-l-4 border-[#f89216]" : "hover:bg-gray-100"}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-[#1c1c1c]">{conv.name}</p>
                <p className="text-sm text-[#333333] truncate">{conv.lastMessage}</p>
              </div>
              {conv.unreadCount && conv.unreadCount > 0 && (
                <span className="bg-[#F89216] text-white text-xs rounded-full px-2 py-1 ml-2">{conv.unreadCount}</span>
              )}
            </div>
          </div>
        ))}
      </aside>

      {/* Chat Area */}
      <main
        id="mainchat"
        className={`flex-1 flex flex-col bg-[#ffc3794d]
        ${!selectedChat ? "hidden md:flex" : "flex"}`}
      >
        {selectedChat ? (
          <>
            {/* Header */}
            <header className="p-4  font-semibold bg-[#F89216] shadow-sm flex items-center gap-3 text-[#333333]">
              <button className="md:hidden text-[#333333] font-bold" onClick={() => setSelectedChat(null)}>
                <FiArrowLeft size={20} />
              </button>
              <span className="text-[#333333]">{selectedChat.name}</span>
            </header>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatHistory[selectedChat.id]?.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`px-4 py-2 rounded-full max-w-xs break-words shadow-sm ${
                      msg.sender === "me" ? "bg-[#333333] text-white" : "bg-[#ffffff] text-[#333333]"
                    }`}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Input */}
            <footer className="p-4 border-t border-gray-200 flex gap-2 bg-white">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !sendingMessage && handleSend()}
                disabled={sendingMessage}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 
                           focus:outline-none focus:ring-2 focus:ring-[#30ac57]/40
                           disabled:opacity-50"
                placeholder={sendingMessage ? "Sending..." : "Type a message..."}
              />
              <button
                onClick={handleSend}
                disabled={sendingMessage || !message.trim()}
                className="bg-[#30ac57] hover:bg-green-700 text-white px-4 py-2 rounded-full transition flex items-center justify-center
                          disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend size={18} />
              </button>
            </footer>
          </>
        ) : (
          <p className="m-auto text-gray-400 hidden md:block">Select a conversation to start chatting</p>
        )}
      </main>
    </div>
  )
}

export default Messages
