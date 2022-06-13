import React from "react";
import { useEffect, useMemo, useState, useRef } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router";
import "../../assets/css/chat.css";
import moment from "moment";
import { Link } from "react-router-dom";
import Calculator from "./Calculator";

const Chat = () => {
  
  const [contact, setContact] = useState({})
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [hasChats, setHasChats] = useState(false)
  let allMessages = []


  const [order, setOrder] = useState('accept','decline')

  const navigate= useNavigate()

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });

  }

    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth", inline: 'start'})
  }

  useEffect(() => {
    
    scrollToBottom()
  }, [messages]);


  const { product_id } = useParams();

  const { conversation_id } = useParams();
  const token = localStorage.getItem("auth_token");
  useEffect(async () => {
    const { data } = await axios.get(`/api/messages/${conversation_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMessages(data);
  }, [conversation_id]);

  useEffect(() => {
    
    const token = localStorage.getItem("auth_token");

    axios
      .get(`api/chats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setChats(res.data.chats);
          setHasChats(true)
        }
      });
  }, []);

  useEffect(() => {
    try {
      Pusher.logToConsole = true;
      const pusher = new Pusher("2b8d8570e2c008128793", {
        cluster: "mt1",
      });
      const channel = pusher.subscribe("chat");
      channel.bind("message", function (data) {
        allMessages.push(data)
        setMessages(allMessages);
        // allMessages.push(data)
        // setMessages(allMessages)
      });
    } catch (error) {
      console.log(error);
    }
  }, [product_id]);
  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");
    if (!message.length) return;
    const {
      data: { message: mm },
    } = await axios.post(
      `http://localhost:8000/api/sendMessages/${conversation_id}`,
      {
        sender: localStorage.getItem("auth_name"),
        message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMessages([...messages, mm]);
    setMessage("")
 

  };


  const updateOrder = (e,order) => {
    e.preventDefault()
    axios.post(`/api/order/${conversation_id}`,{order}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if(res.data.status === 200 ){
        swal("Sucess", res.data.message, 'success')
      }
      else if (res.data.status === 404 ){
        swal("error", res.data.message, 'error')
      }
    })

    console.log(order) 

  }

  const openChat = (c) => {
    if(localStorage.getItem("kind") !== 'simpleUser'){
    setContact(c.client)
    console.log(contact)
    }
    else {
      setContact(c.marketplace.user)

    }
    navigate(`/chat/${c.id}`)
    
  }

  const [calcul, setCalcul] = useState(false)
  const showCalcul = () => {
    setCalcul(!calcul)
  }


  return (
    <div id="container">
      <aside>
        <header>
          <input type="text" placeholder="search" />
        </header>
        <ul>
          {chats.map((c, i) => {
            return (localStorage.getItem("kind") !== 'simpleUser') ? (
              <li key={i}>
                {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""> */}
                <div onClick={() => openChat(c)}>
                  <Link to={`/chat/${c.id}`} >
                  <h2> {c.client.name} </h2>
                  </Link>
                </div>
              </li>
            ) : (
              <li key={i}>
                <div onClick={() => openChat(c)}>
                <Link to={`/chat/${c.id}`} >
                  <h2> {c.marketplace.name} </h2>
                </Link>
                </div>
              </li> 
            )
          })}

        </ul>
      </aside>
      <main>
        <header>
          { (hasChats) ? (
            <div>
            <h2>{contact?.name} </h2>
          </div>
          ) : (
            <h2> You don't have any conversations yet </h2>

          ) }
          
          {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt=""> */}
        </header>
        <ul id="chat" ref={messagesEndRef}>
          {messages.map((m, i) => {
            return (m.sender.name === localStorage.getItem("auth_name")) ? (
              <li className="you" key={i}>
                <div className="entete">
                  <span className="status green"></span>
                  <h2> {m.sender.name} &nbsp;</h2>
                  <h3>{moment(m.created_at).calendar()}</h3>
                </div>
                <div className="triangle"></div>
                <div className="message">{m.message}</div>
              </li>
            ) : (
              <li className="me" key={i}>
                <div className="entete">
                  <h3> {moment(m.created_at).calendar()} &nbsp;</h3>
                  <h2> {m.sender.name} </h2>
                  <span className="status blue"></span>
                </div>
                <div className="triangle"></div>
                <div className="message">{m.message}</div>
              </li>
            );
          })}
        </ul>
        <footer>
          <form onSubmit={submit}>
            <input
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
          <div className="order">
              <button  className="accept" onClick={(e) => updateOrder(e,'accept')} value={order}>
                Accept
              </button>
              <button className="decline" onClick={(e) => updateOrder(e,'decline')} value={order}>
                Decline
              </button>
          </div>
          
              <button className="calcul" onClick={showCalcul}>
                Calculator
              </button>
              <div className="calculator_bazar">

              {calcul ? (
              <Calculator />

              ): (
                <></>
              )}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Chat;
