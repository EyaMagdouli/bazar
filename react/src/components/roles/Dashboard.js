import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../../assets/css/dashboard.css";
import Main from "./Main";
import Navigation from "./Navigation";
import roles from './roles'

const Dashboard = () => {
  const [toggle, settoggle] = useState(false);
  
  // const params = useParams()
  // const nav = useNavigate()
  // const categories = roles.find(e=>e.role === params.role)
  // useEffect(() => {
  //   if(params.role === "simpleUser") nav("/")
  // }, [])

  return (
    //  !categories ? null : (
      <div className="container">
      <Navigation toggle={toggle} />
      <Main toggle={toggle} settoggle={settoggle} />
    </div>
   
  // )
    
  );
};

export default Dashboard;
