import '../css/Login.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Route, Routes, Link,Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // 로그인 요청 보내기
          const response = await axios.post('https://localhost:8080/api/user/login', 
          { username : username, 
            password : password });
    
          // 응답에서 데이터 가져오기
          const loginResult = response.data;
    
          // 로그인 성공 여부 확인
          if (loginResult.success) {
            setLoggedIn(true);
          } else {
            // 로그인 실패 처리
            console.error('로그인 실패:', loginResult.message);
          }
        } catch (error) {
          console.error('로그인 실패:', error.message);
        }
      };
    
      if (loggedIn) {
        // 로그인이 성공했을 때 route로 이동합니다.
        return <Navigate to="/main" />;
      }
    return (
        <div className="Login">
            <div className="mainbg"></div>
            <div className="LoginTop">
                <p><span>Sign</span> <span style={{ color: "#e84f13" }}>in</span></p>
                <p>Welcome out site!!</p>
            </div>
            <form className="LoginInputContainer" style={{ textAlign: "center" }} onSubmit={handleSubmit}>
                <input type="text" placeholder="UserID" value={username} onChange={(e) => setUserId(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Continue</button>
            </form>
            <div className="LoginBottom">
                <p><span>Doesn’t have an account?</span>
                    <Link to="/signup" style={{ color: "#e84f13" }}> <span style={{ fontWeight: "600", textDecoration: "underline" }}>SignUp</span></Link></p>
            </div>

        </div>

    )
}
export default Login;