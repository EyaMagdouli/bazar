import { useEffect, useMemo, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router";
import '../../assets/css/chat.css'

function App() {
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
    <div className="chat" style={{ marginTop: 90, width: 1000, marginLeft: 100 }}>
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white ">
      
        
          {messages.map((message, i) => {
            return (
              <div
                key={i}
                className="list-group-item list-group-item-action py-3 lh-tight"
              >
                <ul className="chat">
                    <li className="you">
                      <div className="entete">
                        <h5 style={{fontSize:11}}>name  &nbsp; </h5>
                        <h6>date</h6>
                      </div>
                      <div className="triangle"></div>
                      <div className="message">
                      {message.message}
                      </div>
                    </li>
                    {/* <li className="me">
                      <div className="entete">
                          <h2>name</h2>
                          <h3>date</h3>
                          <div className="triangle"></div>
                          <div className="message">

                          </div>
                      </div>
                    </li> */}
                </ul>
              </div>
            );
          })}
        </div>
      <form onSubmit={submit}>
        <input
          className="form-control"
          placeholder="Write a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>




      
      </div>



   
  
    
  );
}

export default App;
