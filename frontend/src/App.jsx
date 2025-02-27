import { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "./firebase";
import { Send } from "lucide-react";
import Courses from "./components/Courses";
import ProgressTracker from "./components/ProgressTracker";
import { motion } from "framer-motion";
import Quiz from "./components/Quiz";

export default function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("home");

  // Ensure re-render when navigating
  const [rerender, setRerender] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login Failed:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setActivePage("home");
    } catch (error) {
      console.error("Logout Failed:", error.message);
    }
  };

  const changePage = (page) => {
    setActivePage(page);
    setRerender((prev) => prev + 1); // Ensures re-render
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 text-white">
      {/* Authentication */}
      {!user ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold mb-6">Sign In to Continue</h1>
          <button
            onClick={handleLogin}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-lg font-semibold"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <>
          {/* Navbar */}
          <div className="flex justify-between w-full max-w-md py-4">
            <p className="text-lg font-semibold">Welcome, {user.displayName}!</p>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
            >
              Sign Out
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={() => changePage("quiz")} className="px-6 py-3 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition text-lg font-semibold">Quiz</button>
            <button onClick={() => changePage("progress")} className="px-6 py-3 bg-pink-500 rounded-lg hover:bg-pink-600 transition text-lg font-semibold">Progress Tracking</button>
            <button onClick={() => changePage("courses")} className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 transition text-lg font-semibold">Courses</button>
            <button onClick={() => changePage("chatbot")} className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition text-lg font-semibold">Chatbot</button>
          </div>

          {/* Pages */}
          <div key={rerender} className="w-full max-w-md mt-6">
            {activePage === "quiz" && <Quiz userId={user.uid} onComplete={(score, total) => alert(`You scored ${score}/${total}`)} />}
            {activePage === "progress" && <ProgressTracker userId={user.uid} />}
            {activePage === "courses" && <Courses userId={user.uid} />}
            {activePage === "chatbot" && <Chatbot />}
          </div>
        </>
      )}
    </div>
  );
}

function Chatbot() {
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
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mt-4 text-black">
      <div className="h-80 overflow-y-auto border-b pb-2">
        {chat.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
          >
            <span className={`px-3 py-1 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
              {msg.text}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-green-500 text-white rounded-r hover:bg-green-600 transition duration-300">
          <Send />
        </button>
      </div>
    </div>
  );
}
