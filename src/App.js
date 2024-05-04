import logo from './logo.svg';
import './App.css';
import { Route, Routes,useNavigate,} from 'react-router-dom';
import MainPage from './component/mainpagecomponent';
import React, { useEffect, useState } from 'react';
import Login from './component/logincomponent';
import ShopPage from './component/shoppage';
import SignUp from './component/signup';
import VaccinPage from './component/vaccin';
import ShopDetail from './component/shopdetail';
import shop from './shopdata'
import Camera from './component/camera';
import Board from './component/board';
import Map from './component/map';
import Kakao from './component/kakao';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Camera/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/shop" element={<ShopPage shop={shop} />}></Route>
        <Route path="/shopdetail/:id" element={<ShopDetail shop={shop}/>}></Route>
        <Route path="/vaccin" element={<VaccinPage/>}></Route>
        <Route path="/camera" element={<Camera/>}></Route>
        <Route path="/board" element={<Board></Board> }></Route>
        <Route path="/map" element={<Map/>} ></Route>
      </Routes>
    </div>


  );
}

export default App;
