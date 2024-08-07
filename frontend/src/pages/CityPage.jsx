import React, { useState, useEffect, useRef } from 'react';
import './citypage.css';
import { useParams } from 'react-router-dom';
import api from '../axios';

const CityPage = () => {
  const { city } = useParams();
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() === '') return;

    // Add user prompt to chat history
    setChatHistory([...chatHistory, { type: 'prompt', message: prompt }]);

    api.post(`/api/${city}`, { prompt })
      .then(res => {
        // Add AI reply to chat history
        setChatHistory(prev => [...prev, { type: 'reply', message: res.data.message }]);
      })
      .catch(error => {
        console.log(error);
        // Optionally handle the error by displaying an error message in the chat
        setChatHistory(prev => [...prev, { type: 'reply', message: 'Sorry, something went wrong.' }]);
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
        <input type="text" onChange={handlePrompt} value={prompt} />
        <button onClick={handleSubmit}>{"->"}</button>
      </div>
    </div>
  );
};

export default CityPage;
