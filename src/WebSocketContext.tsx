import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';

type MessageCallback = (data: any) => void;

interface WebSocketContextType {
    sendMessage: (event: string, payload: any) => void;
    subscribe: (event: string, callback: MessageCallback) => () => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

interface WebSocketProviderProps {
    url: string;
    children: React.ReactNode;
}

export const WebSocketProvider = ({ url, children }: WebSocketProviderProps) => {
    const ws = useRef<WebSocket | null>(null);

    const subscribers = useRef<Map<string, Set<MessageCallback>>>(new Map());

    useEffect(() => {
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.current.onmessage = (messageEvent) => {
            try {
                // data is in the format { event: string, data: any }
                const { event, data } = JSON.parse(messageEvent.data);
                console.log(JSON.parse(messageEvent.data))

                const eventSubscribers = subscribers.current.get(event);
                if (eventSubscribers) {
                    eventSubscribers.forEach((callback) => callback(data));
                }
            } catch (error) {
                console.error('Failed to parse WebSocket message:', error);
            }
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.current?.close();
        };
    }, [url]);

    const subscribe = useCallback((event: string, callback: MessageCallback) => {
        if (!subscribers.current.has(event)) {
            subscribers.current.set(event, new Set());
        }

        subscribers.current.get(event)!.add(callback);

        return () => {
            const eventSubscribers = subscribers.current.get(event);
            if (eventSubscribers) {
                eventSubscribers.delete(callback);
                if (eventSubscribers.size === 0) {
                    subscribers.current.delete(event);
                }
            }
        };
    }, []);

    const sendMessage = useCallback((event: string, payload: any) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ event, payload }));
        }
    }, []);

    return (
        <WebSocketContext value={{ sendMessage, subscribe }}>
            {children}
        </WebSocketContext>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};