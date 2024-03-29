import { BrowserRouter, Route, Routes } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import Main from './maincomponent';


function MainPage() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            // 특정 위치에 도달하면 isScrolled 값을 변경
            if (position > 100) { // 특정 위치를 조정할 수 있습니다.
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className="Mainpage">
            <div className={`MainTopNav ${isScrolled ? 'hidden' : ''}`}>
                <p>AniCare</p>
            </div>
            <div className='MainBottomNav'>
                <div style={{ marginLeft: "20px" }}>
                    <img src="/home.png" alt="" style={{ width: "20px", marginRight: "10px" }} />
                    Home</div>
                <div style={{ marginRight: "20px" }}>Logout</div>
            </div>
            <Main></Main>
        </div>

    )
};
export default MainPage;