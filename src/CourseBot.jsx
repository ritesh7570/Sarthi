import React, { useState } from "react";
import styled from "styled-components";

// Styling
const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
`;

const ChatToggle = styled.button`
  background: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  background-image: url('https://cdn-icons-png.flaticon.com/512/4712/4712035.png');
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
`;

const ChatBox = styled.div`
  width: 320px;
  max-height: 400px;
  background: #f8f9fa;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  padding: 16px;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 80px;
  right: 0;
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
`;

const Message = styled.div`
  background: ${(props) => (props.type === "bot" ? "#e2e3e5" : "#d1e7dd")};
  margin: 6px 0;
  padding: 8px 12px;
  border-radius: 20px;
  align-self: ${(props) => (props.type === "bot" ? "flex-start" : "flex-end")};
  max-width: 80%;
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 20px;
`;

const SendButton = styled.button`
  padding: 8px 14px;
  border: none;
  background: #0d6efd;
  color: white;
  border-radius: 20px;
  cursor: pointer;
`;

const demoCourses = {
  "web development": [
    "Frontend Developer (React) - Coursera",
    "Full Stack Web Dev - Udemy",
    "Modern JavaScript - Codecademy",
  ],
  "data science": [
    "IBM Data Science - Coursera",
    "Data Analyst with Python - DataCamp",
    "AI For Everyone - Coursera",
  ],
};

function FloatingChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! Ask me about any course topic like 'Web Development' or 'Data Science'!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    const lowerText = userText.toLowerCase();
    const userMessage = { type: "user", text: userText };
  
    let botMessage;
  
    // Course recommendation
    if (demoCourses[lowerText]) {
      const courses = demoCourses[lowerText];
      botMessage = {
        type: "bot",
        text: `Popular courses:\n• ${courses.join("\n• ")}`,
      };
    }
    // Small talk replies
    else if (["hello", "hi", "hey"].includes(lowerText)) {
      botMessage = { type: "bot", text: "Hello! 👋 How can I help you today?" };
    } else if (lowerText.includes("how are you")) {
      botMessage = { type: "bot", text: "I'm just a bunch of code, but I'm doing great! 😄" };
    } else if (lowerText.includes("thank")) {
      botMessage = { type: "bot", text: "You're welcome! 😊" };
    }
    // Default fallback
    else {
      botMessage = {
        type: "bot",
        text: "Hmm... I can help with course recommendations like 'Web Development' or just have a friendly chat!",
      };
    }
  
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };
  
  return (
    <ChatContainer>
      {open && (
        <ChatBox>
          <Messages>
            {messages.map((msg, i) => (
              <Message key={i} type={msg.type}>
                {msg.text.split("\n").map((line, j) => (
                  <div key={j}>{line}</div>
                ))}
              </Message>
            ))}
          </Messages>
          <InputRow>
            <Input
              placeholder="Ask a topic..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <SendButton onClick={handleSend}>Send</SendButton>
          </InputRow>
        </ChatBox>
      )}
      <ChatToggle onClick={() => setOpen(!open)} />
    </ChatContainer>
  );
}

export default FloatingChatBot;

