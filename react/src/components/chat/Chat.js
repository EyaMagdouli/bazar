import React from 'react'
import { useEffect, useMemo, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router";
import '../../assets/css/chat.css'

const Chat = () => {

    const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");


  const { product_id } = useParams();


  useEffect( async () => {
    const token = localStorage.getItem("auth_token");
   const {data} = await axios
      .get(`/api/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setMessages(data)
  }, []);

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
  const { marketplace_id } = useParams();
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
  // console.log(message[0].message)


  return (
    <div id="container">
	<aside>
		<header>
			<input type="text" placeholder="search" />
		</header>
		<ul>
			<li>
				{/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""> */}
				<div>
					<h2>Prénom Nom</h2>
					
				</div>
			</li>
			<li>
				{/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_02.jpg" alt=""> */}
				<div>
					<h2>Prénom Nom</h2>
					
				</div>
			</li>
			<li>
				{/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_03.jpg" alt=""> */}
				<div>
					<h2>Prénom Nom</h2>
					
				</div>
			</li>
			<li>
				{/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_04.jpg" alt=""> */}
				<div>
					<h2>Prénom Nom</h2>
					
				</div>
			</li>
	
		
		</ul>
	</aside>
	<main>
		<header>
			{/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""> */}
			<div>
				<h2>Chat with Vincent Porter</h2>
			</div>
			{/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt=""> */}
		</header>
		<ul id="chat" >
        { messages.map((m,i) => {
            return (  
			<li className="you" key={i}>
				<div className="entete">
					<span className="status green"></span>
					<h2>Vincent &nbsp;</h2>
					<h3></h3>
				</div>
				<div className="triangle"></div>
				<div className="message">
					{m.message}
				</div>
			</li>
			
         )
        }) }
        {/* <li className="me">
				<div className="entete">
					<h3>10:12AM, Today</h3>
					<h2>Vincent</h2>
					<span className="status blue"></span>
				</div>
				<div className="triangle"></div>
				<div className="message">
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
				</div>
			</li> */}
		</ul>
		<footer>
			<textarea placeholder="Type your message"></textarea>
			{/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt="">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt=""> */}
			<a href="#">Send</a>
		</footer>
	</main>
</div>
  )
}

export default Chat