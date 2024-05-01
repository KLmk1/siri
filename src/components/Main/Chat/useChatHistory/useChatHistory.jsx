// useChatHistory.jsx
import { useState } from 'react';

function useChatHistory(initialMessages = []) {
  const [messages, setMessages] = useState(initialMessages);

  const addMessage = (content, fromBot) => {
    const newMessage = {
      id: Date.now(),
      content: content,
      fromBot: fromBot // Устанавливаем флаг, указывающий, кто отправил сообщение
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return { messages, addMessage };
}

export default useChatHistory;
