import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import '../css/Shop.css';
import {
    ButtonGroup,
    Button

} from '@mui/material';

function ShopPage(props) {
    const [isScrolled, setIsScrolled] = useState(false);
    let [filtershop,setFilterShop] = useState([]);
    let [search,setSearch] = useState("");
    
    
    useEffect(() => {
        if (!filtershop) {
            setFilterShop(props.shop);
            return;
        }

        const filtered = props.shop.filter(item => {
            return item.product.toLowerCase().includes(search.toLowerCase());
            console.log(filtered)
        });
        setFilterShop(filtered);
        
    }, [search, props.shop]);
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
                <Link to="/main" style={{ textDecoration: "none", color: "black" }}><div style={{ marginLeft: "20px" }}>
                    <img src="/home.png" alt="" style={{ width: "20px", marginRight: "10px" }} />
                    Home</div></Link>
                <div style={{ marginRight: "20px" }}>Logout</div>
            </div>
            {/* 여기서부터 shop html */}
            <div className='ShopContainer' style={{ paddingTop: "110px" }}>
                <div className='ShopTop'>
                    <p>Search for a product</p>
                    <input
                        type="text"
                        placeholder='Search...'
                        onChange={(e)=>setSearch(e.target.value)} />
                    <ButtonGroup variant="contained" aria-label="Basic button group"
                        style={{ width: "70%", backgroundColor: "#45A8F0", marginTop: "20px" }}>
                        <Button style={{ backgroundColor: "#5baee9", fontWeight: "600" }} className='ShopButton'>장난감</Button>
                        <Button style={{ backgroundColor: "#5baee9", fontWeight: "600" }} className='ShopButton'>간식</Button>
                        <Button style={{ backgroundColor: "#5baee9", fontWeight: "600" }} className='ShopButton'>편리용품</Button>
                    </ButtonGroup>

                </div>
                <div className='ShopSection'style={{marginBottom:"100px"}}>
                    {
                        filtershop.map(function (a, i) {
                            return (
                                <div className='box' >

                                    <Link to={`/shopdetail/${a.id}`}>
                                    <img src={`../picture/shop${a.id}.JPG`} width="100%" height="70%" />
                                    </Link>
                                    <h4 style={{marginTop:"10px"}}>{a.product}</h4>


                                </div>
                            )
                        })
                    }



                </div>
            </div>
        </div>

    )
};
export default ShopPage;