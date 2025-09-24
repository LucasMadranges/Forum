import "./App.css";
import {useEffect, useState} from "react";

function App() {
    const [messages, setMessages] = useState([]);

    async function handleGetMessages() {
        try {
            const res = await fetch(import.meta.env.VITE_API_URL ?? "http://localhost:3000/message");
            if (!res.ok) {
                const text = await res.text();
                console.error("GET /message failed", res.status, text);
                return;
            }
            const data = await res.json();
            setMessages(data);
        } catch (e) {
            console.error("Network error", e);
        }
    }

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                await handleGetMessages();
            } catch (e) {
                console.error(e);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <>
            <a href={"http://localhost:8080/"}>Envoyer un message</a>
            <h1>Liste des messages</h1>
            <div className={"container"}>
                {messages.length > 0 && messages.map((message, index) => (
                    <div key={index}
                         style={{marginBottom: "24px"}}
                         className={"message"}>
                        <span>{message.username}</span>
                        <span>{message.message}</span>
                    </div>
                ))}
                {messages.length === 0 &&
                    <span style={{color: "lightgreen"}}>Aucun message pour le moment</span>}
            </div>
        </>
    );
}

export default App;
