import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../home/Home";
import CreateMarketplace from "../marketplace/CreateMarketplace";
import ChooseKind from "../auth/ChooseKind";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import { ProtectedRoute } from "../route/ProtectedRoute";
import Dashboard from "../dashboard/Dashboard";
import EditProfile from "../user/EditProfile"
import Marketplace from "../home/Marketplace";
import Product from "../home/Product";
import Chat from "../chat/Chat"
import Calculator from "../chat/Calculator";


const Body = React.forwardRef((props, prodsRef) => {
  useEffect(() => {}, [localStorage.getItem("auth_token")]);
  return (
    <Routes>
      {/* User routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login/forgotPassword" element={<ForgotPassword />} />
      <Route path="/login/resetPassword/:token" element={<ResetPassword />} />
      <Route path="/chooseKind" element={<ChooseKind />} />

      <Route path="/profile/edit" element={ <EditProfile/> } />


      <Route
        path="/createMarket"
        element={<ProtectedRoute Component={<CreateMarketplace />} />}
      />



      {/* chat */}
      <Route path="/chat/:conversation_id" element={< Chat />} />
      <Route path="/chat" element={< Chat />} />
      {/* <Route path="/regular" element={<VerifyRoleRoute Component={<div>HENLOW REGULAR</div>} role="regular" />} />
      <Route path="/planter" element={<VerifyRoleRoute Component={<div>HENLOW PLANTER</div>} role="planter" />} /> */}
      <Route path="/" element={<Home ref={prodsRef} />} />
      <Route path="/marketplace/:marketplace_id" element={< Marketplace />} />
      <Route path="/product/:product_id" element={< Product />} />
      <Route path="/calculator" element={< Calculator />} />

      {/* dashboard */}
      <Route
        path="/dashboard/*"
        element={<ProtectedRoute Component={<Dashboard />} />}
      />

      {/* Buyer Router 
      <Route path='/buyer/dashboard' element={ <Dashboard/> } />
     

       <BuyerPrivateRoute path='/buyer/dashboard'  /> */}
    </Routes>
  );
});
export default Body