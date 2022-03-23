import React, {useState} from 'react';
import Header from './components/layout/Header';
import Body from './components/layout/Body';
import Footer from './components/layout/Footer';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreateMarketplace from './components/marketplace/CreateMarketplace';



function App()  {
    return (
      <>
        <Header />
        <Body />
        <Footer />
      </>
)
};


export default App;