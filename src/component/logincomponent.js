import '../css/Login.css';

import { Route, Routes, Link } from 'react-router-dom';
function Login() {
    return (
        <div className="Login">
            <div className="mainbg"></div>
            <div className="LoginTop">
                <p><span>Sign</span> <span style={{ color: "#0D99FF" }}>in</span></p>
                <p>Welcome out site!!</p>
            </div>
            <form className="LoginInputContainer" style={{textAlign:"center"}}>
                <input type="text" placeholder="UserID" />
                <input type="password" placeholder="Password" />
                <button>Continue</button>
            </form>
            <div className="LoginBottom">
                <p><span>Doesn’t have an account?</span>
                    <Link to="/signup" style={{ color: "#219ef8" }}> <span style={{ fontWeight: "600", textDecoration: "underline" }}>SignUp</span></Link></p>
            </div>
            
        </div>

    )
}
export default Login;