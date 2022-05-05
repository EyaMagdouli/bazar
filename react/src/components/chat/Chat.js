import React, { useState } from "react";
import "../../assets/css/chat.css";

const Chat = () => {
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('')

    const submit = () => {

    }

  return (
    <div >
      <main>
        {messages.map((message) => {
          return (
            <ul id="chat" key={message}>
              <li className="you">
                <div className="entete">
                  <span className="status green"></span>
                  <h2> {message.name} </h2>
                </div>
                <div className="triangle"></div>
                <div className="message">
                  {message.message}
                </div>
              </li>
              {/* <li className="me">
                <div className="entete">
                  <h2>Vincent</h2>
                  <span className="status blue"></span>
                </div>
                <div className="triangle"></div>
                <div className="message">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor.
                </div>
              </li> */}
            </ul>
          );
        })}
        <footer>
        <form onSubmit={submit}>

     <input placeholder="Type your message" value={message}
          onChange={e => setMessage(e.target.value)} />

          </form>
          

          
       

          <a href="#">Send</a>
          </footer>
      </main>
    </div>
  );
};

export default Chat;
