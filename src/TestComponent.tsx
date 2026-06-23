import { useEffect, useState } from 'react';
import { useWebSocket } from './WebSocketContext';

interface MessagePayload {
    id: string;
    text: string;
    user: string;
}

const TestComponent = () => {
    const { subscribe, sendMessage } = useWebSocket();
    const [messages, setMessages] = useState<MessagePayload[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const unsubscribe = subscribe('new_message', (data: MessagePayload) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            unsubscribe();
        };
    }, [subscribe]);

    const handleSend = () => {
        if (!input.trim()) return;

        sendMessage('send_chat', input);
        setInput('');
    };

    return (
        <div>
            <div className="chat-box">
                {messages.map((msg) => (
                    <p key={msg.id}>
                        <strong>{msg.user}:</strong> {msg.text}
                    </p>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default TestComponent;