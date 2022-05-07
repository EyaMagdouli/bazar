import { useEffect, useMemo, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router";

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState();
  const [marketplace, setMarketplace] = useState()
  const [messageInput, setMessageInput] = useState({
    'message' :""
  })


  const { product_id } = useParams();

  useEffect(() => {
    try {
      const fetch = async({product_id})=>{
        if(!product_id) throw new Error("undefined");
        const token = localStorage.getItem("auth_token");
        const {data} = await axios
        .get(`/api/conversation/${product_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }) 
          if (data.status === 200) {
            setProduct(data.product);
            setMarketplace(data.marketplace[0]);
          } else if (data.status === 404) {
            swal("Error", data.message, "error");
          }
      }
      (async()=>await fetch({product_id}))()
      Pusher.logToConsole = true;
      const pusher = new Pusher("2b8d8570e2c008128793", {
        cluster: "mt1",
      });
      const channel = pusher.subscribe("chat");
      channel.bind("message", function (data) {
        setMessages([...messages,data])
      });
    } catch (error) {
      console.log(error)
    }
  }, [product_id]);

  const submit = async (e) => {
    e.preventDefault();
    if(!message.length) return;
    await fetch("http://localhost:8000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: localStorage.getItem("auth_name"),
        message,
      }),
    });
    setMessage("");
  }

  return (
    <div className="container" style={{ top: 90 }}>
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
        <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
          <input className="fs-5 fw-semibold" value={marketplace?.sender?.name||""} onChange={e => setSender(e.target.value)} />
        </div>
        <div
          className="list-group list-group-flush border-bottom scrollarea"
          style={{ minHeight: 100 }}
        >
          {messages.map((message, i) => {
            return (
              <div
                key={i}
                className="list-group-item list-group-item-action py-3 lh-tight"
              >
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <strong className="mb-1">{message.name}</strong>
                </div>
                <div className="col-10 mb-1 small">{message.message}</div>
              </div>
            );
          })}
        </div>
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
