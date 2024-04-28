import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      refreshAccessToken(refreshToken);
    }
  }, []);

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post('http://3.38.225.120:8080/api/user/refresh-token', {
        refreshToken: refreshToken
      });

      const refreshedTokens = response.data;

      localStorage.setItem('accessToken', refreshedTokens.accessToken);
      localStorage.setItem('refreshToken', refreshedTokens.refreshToken);

      setLoggedIn(true);
    } catch (error) {
      console.error('토큰 갱신 실패:', error.message);
      setLoggedIn(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://3.38.225.120:8080/api/user/login', {
        username: username,
        password: password
      });

      const loginResult = response.data;

      if (loginResult.success) {
        localStorage.setItem('accessToken', loginResult.accessToken);
        localStorage.setItem('refreshToken', loginResult.refreshToken);
        setLoggedIn(true);
      } else {
        setError(loginResult.message);
      }
    } catch (error) {
      console.error('로그인 실패:', error.message);
      setError('서버 오류가 발생했습니다.');
    }
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
                <input type="text" placeholder="아이디" value={username} onChange={(e) => setUserId(e.target.value)} />
                <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">로그인</button>
            </form>
            <div className="LoginBottom">
                <p><span>아이디가 없으십니까?</span>
                    <Link to="/signup" style={{ color: "#e84f13" }}> <span style={{ fontWeight: "600", textDecoration: "underline" }}>SignUp</span></Link></p>
            </div>

        </div>

    )
}
export default Login;
