import React, { useState, useEffect } from "react";
import '../CSS/ChatPage.css'

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user")); // Assuming user info is stored in localStorage

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       // const response = await fetch("http://localhost:7070/chat");
  //       const data = await response.json();
  //       setMessages(data);
  //     } catch (error) {
  //       console.error("Error fetching messages:", error);
  //     }
  //   };

  //   fetchMessages();
  //   const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds
  //   return () => clearInterval(interval);
  // }, []);

  // const sendMessage = async () => {
  //   if (!newMessage.trim()) return;

  //   const messageData = {
  //     userRole: user.userRole,
  //     username: user.name,
  //     text: newMessage,
  //   };

  //   try {
  //     const response = await fetch("http://localhost:7070/chat", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(messageData),
  //     });

  //     if (response.ok) {
  //       setNewMessage("");
  //     }
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

  return (
    <div className="chat-container">
      <h2>Global Chat</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <strong>{msg.userRole} - {msg.username}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        {/* <button onClick={sendMessage}>Send</button> */}
        <button >Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
