import "./App.css";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("https://socketio-experiments-backend.vercel.app/");
const userName = nanoid(4);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(()=>{
    socket.on("chat",(payload)=>setChat([...chat,payload]))
  })

  const sendChat = (e)=>{
    e.preventDefault();
    socket.emit("chat",{message,userName});
    setMessage('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>socket io</h1>
        {chat.map((payload,index)=>{
          return(
            <p key={index}>{payload.userName} : {payload.message}</p>
          )
        })}
        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
