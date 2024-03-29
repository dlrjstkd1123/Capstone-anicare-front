import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './component/mainpagecomponent';
import React, { useEffect, useState } from 'react';
import Login from './component/logincomponent';
import ShopPage from './component/shoppage';
import SignUp from './component/signup';
function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/shop" element={<ShopPage/>}></Route>


      </Routes>
    </div>


  );
}

export default App;
