"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Chat() {
  const [messages, setMessages] = useState<Array<{ text: string; sender: string }>>([]);
  const [newMessage, setNewMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const res = await fetch("/api/auth/check");
      const data = await res.json();
      if (!data.authenticated) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add message to the chat
    setMessages([...messages, { text: newMessage, sender: "user" }]);
    setNewMessage("");

    // Here you would typically send the message to your backend
    // and handle the response
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex items-center justify-end p-4 bg-white border-b">
        <Link href="/account">
          <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">Account</button>
        </Link>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-white text-gray-800"
              } max-w-[70%]`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 