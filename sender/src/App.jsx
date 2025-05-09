import './App.css';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSendMessage() {
    setIsSuccess(false);

    const response = await fetch('http://localhost:3000/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // <-- ajout du header
      },
      body: JSON.stringify({
        username,
        message,
      }),
    });

    if (response.ok) {
      setIsSuccess(true);
    }
  }

  return (
    <>
      <a href={'http://localhost:80/'}>Lire les messages</a>
      <h1>Envoyer un message</h1>
      <div className={'container'}>
        <div className={'input'}>
          <label htmlFor={'username'}>Nom d'utilisateur</label>
          <input
            name={'username'}
            id={'username'}
            value={username}
            onChange={e => setUsername(e.target.value)}
            type={'text'}
          />
        </div>

        <div className={'input'}>
          <label htmlFor={'message'}>Message</label>
          <textarea
            name={'message'}
            id={'message'}
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={12}
          />
        </div>

        <button style={{ marginBottom: '24px' }} onClick={handleSendMessage}>
          Envoyer
        </button>

        {isSuccess && (
          <div>
            <span style={{ color: 'lightgreen' }}>Message envoyé avec succès</span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
