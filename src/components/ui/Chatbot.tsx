"use client";
import React, { useState } from 'react';
import styles from './Chatbot.module.css'; // Create some CSS for positioning

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.chatbot}>
      <button onClick={toggleChatbot} className={styles.chatbotButton}>
        Chat
      </button>
      {isOpen && (
        <div className={styles.chatbotWindow}>
          {/* Your chatbot UI or embed iframe/code goes here */}
          <div>Chatbot is open!</div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
