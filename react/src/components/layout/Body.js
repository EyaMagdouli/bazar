import React from 'react';
import { Route, Routes } from 'react-router';
import { Protected } from '../../Protected';
import  Login from '../auth/Login';
import Register from '../auth/Register';
import Home from './Home';
import CreateMarketplace from '../marketplace/CreateMarketplace';
import ChooseKind from '../auth/ChooseKind';
import ForgotPassword from '../auth/ForgotPassword';

export default function Body() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/forgotPassword" element={<ForgotPassword />} />
      <Route path="/chooseKind" element={<ChooseKind />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/createMarket" element={<Protected element={<CreateMarketplace />} />} />
    </Routes> 
  )
}
