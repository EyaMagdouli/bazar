import React, { useState } from "react";
import "../../assets/css/dashboard.css";
import Main from "./Main";
import Navigation from "./Navigation";

const Dashboard = () => {
  const [toggle, settoggle] = useState(true);

  return (
    <div className="container">
      <Navigation toggle={toggle} />
      <Main toggle={toggle} settoggle={settoggle} />
    </div>
  );
};

export default Dashboard;
