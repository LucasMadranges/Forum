import './App.css';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  async function handleSendMessage() {
    await fetch('http://localhost:3000/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        message,
      }),
    });
  }

  return (
    <>
      <a href={'http://localhost:80/'}>Lire les messages</a>
      <h1>Envoyer un message</h1>
      <div className={'container'}>
        <div className={'input'}>
          <label>Nom d'utilisateur</label>
          <input value={username} onChange={e => setUsername(e.target.value)} type={'text'} />
        </div>

        <div className={'input'}>
          <label>Message</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={12} />
        </div>

        <button onClick={handleSendMessage}>Envoyer</button>
      </div>
    </>
  );
}

export default App;
