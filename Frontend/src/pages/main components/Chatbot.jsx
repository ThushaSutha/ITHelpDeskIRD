import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Function to handle user input submission
  const handleSend = () => {
    if (input.trim() === "") return;

    // Update messages with the user's input
    setMessages([...messages, { sender: "User", text: input }]);
    setInput("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", text: botResponse },
      ]);
    }, 500);
  };

  // Function to simulate bot response
  const getBotResponse = (userInput) => {
    if (userInput.toLowerCase().includes("hello")) {
      return "Hi there! How can I assist you today?";
    }
    return "I'm here to help! Please ask your question.";
  };

  // Handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Handle pressing Enter to send a message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div style={styles.chatbotContainer}>
      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "User" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "User" ? "#d1f7c4" : "#f0f0f0",
            }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatbotContainer: {
    width: "400px",
    margin: "20px auto",
    border: "1px solid #ccc",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  chatWindow: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    maxHeight: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  message: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "80%",
    wordWrap: "break-word",
  },
  inputContainer: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ccc",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  sendButton: {
    marginLeft: "10px",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Chatbot;