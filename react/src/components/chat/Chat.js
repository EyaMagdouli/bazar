import React from 'react'
import { useEffect, useMemo, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router";
import '../../assets/css/chat.css'
import moment from 'moment';

const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState([]);


  const { product_id } = useParams();

  const { marketplace_id } = useParams();

  useEffect( async () => {
    const token = localStorage.getItem("auth_token");
   const {data} = await axios
      .get(`/api/messages/${marketplace_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setMessages(data)
  }, []);

useEffect(() => {
  const token = localStorage.getItem("auth_token");

  axios.get(`api/chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if(res.data.status === 200) {

      setChats(res.data.chats)
      console.log(chats)
    }
  })
}, [])

  // useEffect(() => {
  //   axios.get(`api/chats/`).then((res) => {
  //     if (res.data.status === 200) {
  //       setChats(res.data.chats);
  //       console.log(chats)
  //     }
  //   });

  // useEffect( async () => {
  //   const token = localStorage.getItem("auth_token");
  //  const {data} = await axios
  //     .get(`/api/chats`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     setChats(data)
  //     console.log(chats)
  // }, []);

  useEffect(() => {
    try {
      // const fetch = async({product_id})=>{
      //   if(!product_id) throw new Error("undefined");
      //   const token = localStorage.getItem("auth_token");
      //   const {data} = await axios
      //   .get(`/api/conversation/${product_id}`, {
      //     divs: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      //     if (data.status === 200) {
      //       setProduct(data.product);
      //       setMarketplace(data.marketplace[0]);
      //     } else if (data.status === 404) {
      //       swal("Error", data.message, "error");
      //     }
      // }
      //(async()=>await fetch({product_id}))()
      Pusher.logToConsole = true;
      const pusher = new Pusher("2b8d8570e2c008128793", {
        cluster: "mt1",
      });
      const channel = pusher.subscribe("chat");
      channel.bind("message", function (data) {
        setMessages([...messages, data]);
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
    const {data: {message:mm}} = await axios.post(
      `http://localhost:8000/api/sendMessages/${marketplace_id}`,
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
    // console.log(res);
    setMessages([...messages,mm])
    setMessage("");
  };
//   console.log(message.receiver.name)

  return (
    <div id="container">
	<aside>
		<header>
			<input type="text" placeholder="search" />
		</header>
		<ul>
     {chats.map((c,i) => {
       return(
        <li>
        {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""> */}
        <div>
          <h2> {c} </h2>
          
        </div>
      </li>
       )
     })}
          <li>
          {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""> */}
          <div>
            <h2> {/* {c} */} </h2>
            
          </div>
        </li>
        
		
		</ul>
	</aside>
	<main>
		<header>
			{/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""> */}
			<div>
				<h2>Chat with {/* {messages[0].receiver.name} */} </h2>
			</div>
			{/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt=""> */}
		</header>
		<ul id="chat" >
        { messages.map((m,i) => {
            return (  
             
                (m.sender.name === localStorage.getItem("auth_name") ) ? (
                  <li className="you" key={i}>
				<div className="entete">
					<span className="status green"></span>
					<h2> {m.sender.name} &nbsp;</h2>
					<h3>{moment(m.created_at).calendar()}</h3>
				</div>
				<div className="triangle"></div>
				<div className="message">
					{m.message}
				</div>
			</li>
                ) : (
                   <li className="me" key={i}>
                    <div className="entete">
                    <h3> {moment(m.created_at).calendar()}  &nbsp;</h3>
                    <h2> {m.sender.name}  </h2>
                    <span className="status blue"></span>
                  </div>
                  <div className="triangle"></div>
                  <div className="message">
                    {m.message}
                  </div>
                </li> 
                )
			
			
         )
        }) }
       
		</ul>
		<footer>
            <form onSubmit={submit}>
			<input placeholder="Type your message" 
          onChange={(e) => setMessage(e.target.value)} /> 
			<button type='submit'>Send</button>
            </form>
		</footer>
	</main>
</div>
  )
}

export default Chat