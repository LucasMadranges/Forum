import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);

  async function handleGetMessages() {
    const response = await fetch('http://localhost:3000/', {
      method: 'GET',
    });
    const data = await response.json();
    setMessages(data);
  }

  useEffect(() => {
    async function handleRequest() {
      await handleGetMessages();
    }

    handleRequest();
  }, []);

  return (
    <>
      <a href={'http://localhost:8080/'}>Envoyer un message</a>
      <h1>Liste des messages</h1>
      <div className={'container'}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '24px' }} className={'message'}>
            <span>{message.username}</span>
            <span>{message.message}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
