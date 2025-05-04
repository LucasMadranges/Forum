import './App.css';

function App() {
  return (
    <>
      <a href={'http://localhost:8080/'}>Envoyer un message</a>
      <h1>Liste des messages</h1>
      <div className={'container'}>
        <div className={'message'}>
          <span>Bob</span>
          <span>Message</span>
        </div>
      </div>
    </>
  );
}

export default App;
