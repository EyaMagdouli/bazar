import React from 'react'

const DashHome = () => {
  return (
    <div className="cardBox">
    <div className="card">
      <div>
        <div className="numbers" >1500</div>
        <div className="cardName">Number of Clients</div>
      </div>
      <div className="iconBx">
      <ion-icon name="people-circle-outline"></ion-icon>
      </div>
    </div>
    <div className="card">
      <div>
        <div className="numbers" >1500</div>
        <div className="cardName">Number of Products</div>
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