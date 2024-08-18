import React, { useState, useEffect, useRef } from 'react';
import './citypage.css';
import { useParams } from 'react-router-dom';
import api from '../axios';

const CityPage = () => {
  const { city } = useParams();
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([{message:`Hey there! What would you like to know about ${city}`}]);
  const chatEndRef = useRef(null);

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Trigger button click
      document.getElementById('submit').click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() === '') return;

    // Add user prompt to chat history
    setChatHistory([...chatHistory, { type: 'prompt', message: prompt }]);
    setChatHistory(prev => [...prev, { type: 'reply', message: '...' }]);
    api.post(`/api/${city}`, { prompt })
      .then(res => {
        // Add AI reply to chat history
        setChatHistory(prev => {
          // Create a copy of the previous state
          const newChatHistory = [...prev];
          
          // Replace the message key of the last element
          if (newChatHistory.length > 0) {
            newChatHistory[newChatHistory.length - 1].message = res.data.message;
          }
        
          // Return the updated array
          return newChatHistory;
        });
      })
      .catch(error => {
        console.log(error);
        // Optionally handle the error by displaying an error message in the chat
        setChatHistory(prev => {
          // Create a copy of the previous state
          const newChatHistory = [...prev];
          
          // Replace the message key of the last element
          if (newChatHistory.length > 0) {
            newChatHistory[newChatHistory.length - 1].message = 'Sorry, something went wrong';
          }
        
          // Return the updated array
          return newChatHistory;
        });
      });

    setPrompt('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className='container'>
      <div className='scroll-container'>
        <div id='chat-chunk'>
          {chatHistory.map((chat, index) => (
            <div key={index} className={chat.type === 'prompt' ? 'user-message' : 'ai-message'}>
              {chat.message}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>
      <div className='input-container'>
        <input type="text" onChange={handlePrompt} onKeyDown={handleKeyDown} value={prompt} />
        <button onClick={handleSubmit}  id='submit'>{">"}</button>
      </div>
    </div>
  );
};

export default CityPage;
