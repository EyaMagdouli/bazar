import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "./Home";
import CreateMarketplace from "../marketplace/CreateMarketplace";
import ChooseKind from "../auth/ChooseKind";
import ForgotPassword from "../auth/ForgotPassword";
import { ProtectedRoute } from "../route/ProtectedRoute";
import Dashboard from "../roles/Dashboard";

const Body = React.forwardRef((props, prodsRef) => {
  useEffect(() => {}, [localStorage.getItem("auth_token")]);
  return (
    <Routes>
      {/* User routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login/forgotPassword" element={<ForgotPassword />} />
      <Route path="/chooseKind" element={<ChooseKind />} />

      <Route
        path="/createMarket"
        element={<ProtectedRoute Component={<CreateMarketplace />} />}
      />

      {/* <Route path="/regular" element={<VerifyRoleRoute Component={<div>HENLOW REGULAR</div>} role="regular" />} />
      <Route path="/planter" element={<VerifyRoleRoute Component={<div>HENLOW PLANTER</div>} role="planter" />} /> */}
      <Route path="/" element={<Home ref={prodsRef} />} />

      {/* dashboard */}
      <Route
        path="/:role/dashboard/*"
        element={<ProtectedRoute Component={<Dashboard />} />}
      />

      {/* Buyer Router 
      <Route path='/buyer/dashboard' element={ <Dashboard/> } />
     

       <BuyerPrivateRoute path='/buyer/dashboard'  /> */}
    </Routes>
  );
});
export default Body