import '../css/SignUp.css';

import { Route, Routes, Link } from 'react-router-dom';
function SignUp() {
    return (
        <div className="SignUp">
            <div className="SignUpmainbg"></div>
            <div className="SignUpTop">
                <p><span>Sign</span> <span style={{ color: "#e84f13" }}>Up</span></p>
                <p>Create a new account to join
                    our site!</p>
            </div>
            <form className="SignUpInputContainer" style={{textAlign:"center"}}>

                <input type="text" placeholder="UserName" />
                <input type="text" placeholder="UserID" />
                <input type="password" placeholder="Password" />
                <button>Continue</button>
            </form>
            <div className="SignUpBottom">
                <p ><input type="checkbox" /> <span>I agree to terms and conditions</span>
                    <Link to="/login" style={{ color: "#e84f13" }}> <span style={{ fontWeight: "600", textDecoration: "underline" }}>Login</span></Link></p>
            </div>

        </div>

    )
}
export default SignUp;