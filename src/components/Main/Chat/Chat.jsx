import React, { useRef, useEffect, useState } from 'react';
import styles from './Chat.module.scss';
import ChatForm from './ChatForm/СhatForm.jsx';
import useChatHistory from './useChatHistory/useChatHistory.jsx';
import handleTypeButtonClick from './Survey/Survey.jsx';

function Chat() {
  const { messages, addMessage } = useChatHistory();
  const messagesEndRef = useRef(null);
  const [answeredMessages, setAnsweredMessages] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChatFormSubmit = (content) => {
    const currentTime = new Date().toLocaleTimeString();
    let messageContent = { text: content, time: currentTime };

    addMessage(messageContent, true);
  };

  const handleBotMessageAction = (messageId, action) => {
    if (!answeredMessages.includes(messageId)) {
      action();
      setAnsweredMessages(prev => [...prev, messageId]);
    }
  }; /*
  async function logMovies() {
    const response = await fetch("https://www.swapi.tech/api/planets/1/")
    const movies = await response.json();
    addMessage({
      text: movies.message,
      fromBot: false});
  }*/
  useEffect(() => {
    addMessage({
      text: "Какой тип вашего предложения?",
      time: new Date().toLocaleTimeString(),
      buttons: [
        { label: "Продажа", action: () => handleTypeButtonClick(addMessage, true) },
        { label: "Аренда", action: () => handleTypeButtonClick(addMessage, false) }
      ],
      fromBot: true,
      id: "typeQuestion" // Добавляем уникальный идентификатор сообщения
    });
  }, []);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatContent}>
        <div className={styles.messages}>
          {messages.map((message, index) => (
            <div key={index} className={`${styles.message} ${message.fromBot ? styles.botMessage : styles.userMessage}`}>
              <div className={styles.chatprofile}>
                <img src={message.fromBot ? 'user.png' : 'bot.png'} alt={message.fromBot ? 'userimg' : 'botimg'} className={styles.chatavatar} />
                <p className={styles.chatname}>{message.fromBot ? "Вы" : "Бот"} :</p>
              </div>
              <p className={styles.message}>{message.content.text}</p>
              {message.time && <p className={styles.time}>{message.time}</p>}
              {message.content.buttons && message.content.buttons.map((button, btnIndex) => (
                <button
                  className={styles.optionButton}
                  key={btnIndex}
                  onClick={() => handleBotMessageAction(message.id, button.action)} // Передаем идентификатор сообщения и функцию действия
                >
                  {button.label}
                </button>
              ))}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatForm onSubmit={handleChatFormSubmit} />
    </div>
  );
}

export default Chat;
