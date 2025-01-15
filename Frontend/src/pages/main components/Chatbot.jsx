import React, { useState } from "react";
import '../../App.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Function to handle user input submission
  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "User", text: input },
    ]);
    setInput("");

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", text: botResponse },
      ]);
    }, 500);
  };

  const getBotResponse = (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();

    if (lowerCaseInput.includes("hello")) {
      return "Hi there! How can I assist you today?";
    }
    if (lowerCaseInput.includes("help")) {
      return "Sure! Please let me know what you need help with.";
    }
    if (lowerCaseInput.includes("faq")) {
      return "Here are some frequently asked questions:\n1. How to reset my password?\n2. How to contact support?\n3. What are your working hours?";
    }
    if (lowerCaseInput.includes("bye")) {
      return "Goodbye! Have a great day!";
    }

    return "I'm here to help! Please ask your question.";
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title text-deep-purple-900">Chatbot Assistant</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "User" ? "user-message" : "bot-message"}`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button onClick={handleSend} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;