import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessageContext = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async (message) => {
        if (message.length === 0) return;

        setMessages(prevMessages => [...prevMessages, { sender: 'user', message }]);
        setLoading(true);

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer sk-proj-26iGA2CfBcjp4imNo25dT3BlbkFJafPJYbpP4jo7af52MDHx`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: message }],
                    max_tokens: 1024,
                    top_p: 1,
                    temperature: 1,
                    frequency_penalty: 0.5,
                    presence_penalty: 0.5,
                    stop: ['문장 생성 중단 단어'],
                }),
            });

            const data = await response.json();
            const aiResponse = data.choices?.[0]?.message?.content || '응답이 없습니다.';
            const formattedResponse = aiResponse.replace(/\. /g, '.\n');

            setMessages(prevMessages => [...prevMessages, { sender: 'bot', message: formattedResponse }]);
        } catch (error) {
            console.error('Error!', error);
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', message: 'Error!' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MessageContext.Provider value={{ messages, handleSendMessage, loading }}>
            {children}
        </MessageContext.Provider>
    );
};
