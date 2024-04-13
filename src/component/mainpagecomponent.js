import { BrowserRouter, Route, Routes ,Link} from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import Main from './maincomponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function MainPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    let [mainlist,Setmainlist] = useState([])
    
    
    return (
        <div className="Mainpage">
            <div className={`MainTopNav ${isScrolled ? 'hidden' : ''}`}>
                <div>
                    
                    <p className='Logoname'>에케플</p>
                   
                </div>
                <div className="MainTopNavListBox">
                <Link to="/shop" style={{ color: "rgb(111, 111, 111)",textDecoration:"none" }}><p className={`MainTopNavList${mainlist[0]=== "상점"? "active":""}`} onClick={()=>{ 
                        let copy = [...mainlist];
                        copy[0] = "상점";
                        Setmainlist(copy)
                    }}>상  점</p></Link>
                    <Link to="/shop" style={{ color: "rgb(111, 111, 111)",textDecoration:"none" }}><p className={`MainTopNavList${mainlist[0]=== "게시판"? "active":""}`} onClick={()=>{ 
                        let copy = [...mainlist];
                        copy[0] = "게시판";
                        Setmainlist(copy)
                    }}>게시판</p></Link>
                     <Link to="/camera" style={{ color: "rgb(111, 111, 111)",textDecoration:"none" }}><p className={`MainTopNavList${mainlist[0]=== "카메라"? "active":""}`} onClick={()=>{ 
                        let copy = [...mainlist];
                        copy[0] = "카메라";
                        Setmainlist(copy)
                    }}>카메라</p></Link>
                     <Link to="/vaccin" style={{ color: "rgb(111, 111, 111)",textDecoration:"none" }}><p className={`MainTopNavList${mainlist[0]=== "접종"? "active":""}`} onClick={()=>{ 
                        let copy = [...mainlist];
                        copy[0] = "접종";
                        Setmainlist(copy)
                    }}>접종</p></Link>
                    
                </div>
            </div>


            <div className='MainBottomNav'>
                <Link to="/main" style={{ textDecoration: "none", color: "black" }}>
                    <div>
                        <img src="/home.png" alt="" style={{ width: "20px" }} />
                    </div>
                </Link>
                <Link to="/main" style={{ textDecoration: "none", color: "black" }}>
                    <div>
                        <img src="/home.png" alt="" style={{ width: "20px" }} />
                    </div>
                </Link>  
                <Link to="/main" style={{ textDecoration: "none"}}>
                    <div>
                        <img src="/home.png" alt="" style={{ width: "20px" }} />
                    </div>
                </Link>  
            </div>
            <Main></Main>
        </div>

    )
};
export default MainPage;