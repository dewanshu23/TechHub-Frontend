import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/ChatPage.css"; // Import CSS file

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  
  const user = JSON.parse(localStorage.getItem("user")); // Convert string to object
  const userId = user ? user.id : null;

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get("http://localhost:7070/getAllChats");
      setChats(response.data.chat.chats);
      setUsers(response.data.chat.users);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !userId) return;

    try {
      await axios.post("http://localhost:7070/chatEntry", {
        user_id: userId,
        chat_content: message,
      });
      setMessage("");
      fetchChats(); // Refresh chat list after sending message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getUserName = (id) => {
    const user = users.find((u) => u.id === id);
    return user ? user.name : "Unknown User";
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {chats.map((chat) => (
          <div key={chat.id} className="chat-message">
            <strong>{getUserName(chat.user_id)}:</strong> {chat.chat_content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} disabled={!userId}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;