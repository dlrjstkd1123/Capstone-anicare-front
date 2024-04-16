import '../css/SignUp.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';
function SignUp() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
         
          const response = await axios.post('/', { userId, password });
    
         
          const loginResult = response.data;
    
          
          if (loginResult.success) {
            alert("데이터 전송 완료")
          } else {
            // 로그인 실패 처리
            console.error('로그인 실패:', loginResult.message);
          }
        } catch (error) {
          console.error('로그인 실패:', error.message);
        }
      };
    
      
    return (
        <div className="SignUp">
            <div className="SignUpmainbg"></div>
            <div className="SignUpTop">
                <p><span>Sign</span> <span style={{ color: "#e84f13" }}>Up</span></p>
                <p>Create a new account to join
                    our site!</p>
            </div>
            <form className="SignUpInputContainer" style={{textAlign:"center"}}  onSubmit={handleSubmit}>

                <input type="text" placeholder="UserName" />
                <input type="text" placeholder="UserID" value={userId} onChange={(e) => setUserId(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Continue</button>
            </form>
            <div className="SignUpBottom">
                <p ><input type="checkbox" /> <span>I agree to terms and conditions</span>
                    <Link to="/login" style={{ color: "#e84f13" }}> <span style={{ fontWeight: "600", textDecoration: "underline" }}>Login</span></Link></p>
            </div>

        </div>

    )
}
export default SignUp;