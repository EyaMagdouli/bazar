import React, { useEffect, useState } from 'react'
import axios from 'axios';

const DashHome = () => {

  const [products, setProducts] = useState()
  const [conversations, setConversations] = useState()
useEffect(() => {
  const token = localStorage.getItem("auth_token");
  axios
    .get(`/api/chart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.data.status === 200) {
        
        setProducts(res.data.products)
        setConversations(res.data.conversations)
      }
    });
}, []);
console.log(products)


  return (
    <div className="cardBox">
    <div className="card">
      <div>
        <div className="numbers" > {conversations} </div>
        <div className="cardName">Clients</div>
      </div>
      <div className="iconBx">
      <ion-icon name="people-circle-outline"></ion-icon>
      </div>
    </div>
    <div className="card">
      <div>
        <div className="numbers" > {products} </div>
        <div className="cardName">Products</div>
      </div>
      <div className="iconBx">
      <ion-icon name="nutrition-outline"></ion-icon>
      </div>
    </div>
    <div className="card">
      <div>
        <div className="numbers" >1500</div>
        <div className="cardName">Earnings</div>
      </div>
      <div className="iconBx">
      <ion-icon name="cash-outline"></ion-icon>
      </div>
    </div>
    <div className="card">
      <div>
        <div className="numbers" >1500</div>
        <div className="cardName">Sales</div>
      </div>
      <div className="iconBx">
      <ion-icon name="cart-outline"></ion-icon>  
      </div>
    </div>
  </div>
  
  )
}

export default DashHome