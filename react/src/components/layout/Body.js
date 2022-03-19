import React from 'react';
import { Route, Routes } from 'react-router';
import { Protected } from '../../Protected';
import Login from '../auth/Login';
import Register from '../auth/Register';
import CreateMarketplace from '../marketplace/CreateMarketplace';

export default function Body() {
  return (
    <Routes>
      <Route path="/" element={"HOMEPAGE"} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createMarket" element={<Protected element={<CreateMarketplace />} />} />
    </Routes>
  )
}
