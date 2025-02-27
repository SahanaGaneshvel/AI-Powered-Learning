import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setChat([...chat, { sender: "user", text: message }]);

    try {
      const response = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setChat((prevChat) => [
        ...prevChat,
        { sender: "user", text: message },
        { sender: "bot", text: data.reply },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage("");
  };

  return (
    <div className="p-4 bg-white text-black rounded shadow-md">
      <div className="h-64 overflow-y-auto border-b pb-2">
        {chat.map((msg, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`px-3 py-1 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
              {msg.text}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="flex mt-2">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l" placeholder="Type your message..." />
        <button onClick={sendMessage} className="px-4 py-2 bg-green-500 text-white rounded-r hover:bg-green-600 transition">
          <Send />
        </button>
      </div>
    </div>
  );
}
