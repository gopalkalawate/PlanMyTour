import React, { useState, useEffect, useRef } from 'react';
import './citypage.css';
import { useParams } from 'react-router-dom';
import api from '../axios';
import ReactMarkdown from 'react-markdown';

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
      document.getElementById('submit').click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() === '') return;

    setChatHistory([...chatHistory, { type: 'prompt', message: prompt }]);
    setChatHistory(prev => [...prev, { type: 'reply', message: '...' }]);
    api.post(`/api/${city}`, { prompt })
      .then(res => {
        setChatHistory(prev => {
          const newChatHistory = [...prev];
          if (newChatHistory.length > 0) {
            newChatHistory[newChatHistory.length - 1].message = res.data.message;
          }
          return newChatHistory;
        });
      })
      .catch(error => {
        console.log(error);
        setChatHistory(prev => {
          const newChatHistory = [...prev];
          if (newChatHistory.length > 0) {
            newChatHistory[newChatHistory.length - 1].message = 'Sorry, something went wrong';
          }
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
              <ReactMarkdown>{chat.message}</ReactMarkdown>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>
      <div className='input-container'>
        <input type="text" onChange={handlePrompt} onKeyDown={handleKeyDown} value={prompt} />
        <button onClick={handleSubmit} id='submit'>{">"}</button>
      </div>
    </div>
  );
};

export default CityPage;
