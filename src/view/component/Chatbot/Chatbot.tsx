
import { useState } from "react";
import "./Chatbot.css";

interface Message {
    sender: "user" | "bot";
    text: string;
}

export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState<Message[]>([
        {
            sender: "bot",
            text: "Hello! Welcome to BookMyVibe. How can I help you today?"
        }
    ]);

    const sendMessage = async () => {
        if (!message.trim() || isLoading) return;

        const userMessage = message.trim();

        setMessages((prev) => [
            ...prev,
            { sender: "user", text: userMessage }
        ]);

        setMessage("");
        setIsLoading(true);

        try {
            const response = await fetch(
                "http://localhost:3000/api/chatbot/message",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: userMessage
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to get chatbot response."
                );
            }

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: data.reply
                }
            ]);

        } catch (error) {
            console.error("Chatbot API Error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "Sorry! Something went wrong. Please try again."
                }
            ]);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div>
                            <h3>BookMyVibe AI</h3>
                            <span>Online Assistant</span>
                        </div>

                        <button onClick={() => setIsOpen(false)}>
                            ×
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chat-message ${msg.sender}`}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="chat-message bot">
                                Typing...
                            </div>
                        )}
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            placeholder="Ask me about events..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            disabled={isLoading}
                        />

                        <button
                            onClick={sendMessage}
                            disabled={!message.trim() || isLoading}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

            <button
                className="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "×" : "💬"}
            </button>
        </div>
    );
};
