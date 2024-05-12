import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 아이디와 비밀번호 유효성 검사
      const usernameValid = validateUsername(username);
      const passwordValid = validatePassword(password);

      if (!usernameValid) {
        setUsernameError('아이디는 4~10 자리의 영문 소문자와 숫자를 사용해야 합니다.');
        return;
      } else {
        setUsernameError(null);
      }

      if (!passwordValid) {
        setPasswordError('비밀번호는 8~15자리의 영문 소문자와 숫자를 사용해야 합니다.');
        return;
      } else {
        setPasswordError(null);
      }

      const response = await axios.post('http://3.38.225.120:8080/api/user/login', {
        username: username,
        password: password
      });

      const accessToken = response.data.response.token;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        setLoggedIn(true);
      } else {
        setError('토큰을 찾을 수 없습니다.');
        
      }
    } catch (error) {
      console.error('로그인 실패:', error.message);
      setError('서버 오류가 발생했습니다.');
      alert("아이디 비밀번호를 다시 확인해주세요.")
    }
  };

  const validateUsername = (username) => {
    // 아이디 유효성 검사
    const usernameRegex = /^[a-z0-9]{4,10}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    // 비밀번호 유효성 검사 (영문 소문자와 숫자만 사용)
    const passwordRegex = /^[a-z0-9]{8,15}$/;
    return passwordRegex.test(password);
  };

  if (loggedIn) {
    return <Navigate to="/main" />;
  }

  return (
    <div className="Login">
      <div className="mainbg"></div>
      <div className="LoginTop">
        <p><span>Sign</span> <span style={{ color: "#e84f13" }}>in</span></p>
        <p>저희 사이트에 오신 걸 환영합니다!!</p>
      </div>
      <form className="LoginInputContainer" style={{ textAlign: "center" }} onSubmit={handleSubmit}>
        <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
        {usernameError && <div className="error" style={{fontSize:'13px',color:"red"}}>{usernameError}</div>}
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        {passwordError && <div className="error" style={{fontSize:'13px',color:"red"}}>{passwordError}</div>}
        <button type="submit">로그인</button>
      </form>
      
      <div className="LoginBottom">
        <p><span>아이디가 없으십니까?</span>
          <Link to="/signup" style={{ color: "#e84f13" }}> <span style={{ fontWeight: "600", textDecoration: "underline" }}>SignUp</span></Link></p>
      </div>
    </div>
  );
}

export default Login;
