import { useState,useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://3.38.225.120:8080/api/user/login', {
        username: username,
        password: password
      });
  
      // 응답 헤더에서 토큰 추출
      const accessToken = response.headers['Authorization'];
  
      // 토큰이 있는지 확인하고, 있으면 로컬 스토리지에 저장
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
  
        // 로그인 상태를 설정
        setLoggedIn(true);
      } else {
        setError('토큰을 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('로그인 실패:', error.message);
      setError('서버 오류가 발생했습니다.');
    }
  };

  // 페이지 이동을 위한 useEffect
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setLoggedIn(true);
    }
  }, []);

  // 로그인 상태에 따라 페이지를 리디렉션하는 로직
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
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
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
