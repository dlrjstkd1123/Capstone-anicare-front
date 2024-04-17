import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/SignUp.css';


function SignUp() {
    
    

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
   
   
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("사용자 이름과 비밀번호를 모두 입력해주세요.");
            return;
        }

        try {
            const response = await axios.post('https://localhost:8080/api/user/signup', {
                username: username,
                password: password
            });
            console.log(response.data);
            alert("회원가입이 완료되었습니다.");
        } catch (error) {
            
            console.error("회원가입 중 오류 발생:", error);
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };
    return (
        <div className="SignUp">
            <div className="SignUpmainbg"></div>
            <div className="SignUpTop">
                <p><span>Sign</span> <span style={{ color: "#e84f13" }}>Up</span></p>
                <p>Create a new account to join our site!</p>
            </div>
            <form className="SignUpInputContainer" style={{ textAlign: "center" }} onSubmit={handleSubmit}>

                <input type="text" name="userId" placeholder="UserID" value={username} onChange={(e)=>{
                   setUsername(e.target.value); 
                }} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e)=>{
                   setPassword(e.target.value); 
                }} />
                <button type="submit">Continue</button>
            </form>
            <div className="SignUpBottom">
                <p><input type="checkbox" /> <span>I agree to terms and conditions</span></p>
                <p>Already have an account? <Link to="/login" style={{ color: "#e84f13", fontWeight: "600", textDecoration: "underline" }}>Login</Link></p>
            </div>
        </div>
    );
}

export default SignUp;
