import '../css/Shop.css';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {
    ButtonGroup,
    Button

} from '@mui/material';



function ShopDetail(props) {
    let {id} = useParams();
    let detailproduct = props.shop.find(function(x){
        return x.id == id
      });
    const IntroDivider = () => {
        return (
            <Card variant="outlined" sx={{ maxWidth: 350 }}>
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography gutterBottom variant="h6" component="div" style={{fontSize:"17px"}}>
                            {detailproduct.product}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" style={{fontSize:"15px"}}>
                            {detailproduct.price}
                        </Typography>
                    </Stack>
                    <Typography color="text.secondary" variant="body2" style={{fontSize:"12px"}}>
                        {detailproduct.content}
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Typography gutterBottom variant="body2">
                        <ButtonGroup variant="contained" aria-label="Basic button group"
                            style={{ width: "60%", backgroundColor: "#45A8F0"}}>
                            <Button style={{ backgroundColor: "#5baee9", fontWeight: "600" }} className='ShopDetailButton'>-</Button>
                            <Button style={{ backgroundColor: "#5baee9", fontWeight: "600" }} className='ShopDetailButton'>+</Button>
                        </ButtonGroup>
                    </Typography>

                </Box>
            </Card>
        );
    }
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
                <Link to="/main" style={{ textDecoration: "none", color: "black" }}><div style={{ marginLeft: "20px" }}>
                    <img src="/home.png" alt="" style={{ width: "20px", marginRight: "10px" }} />
                    Home</div></Link>
                <div style={{ marginRight: "20px" }}>Logout</div>
            </div>
            {/* 여기서부터 shopdetail html */}
            <Link to="/shop"><h3 style={{ paddingTop: "110px", textAlign: "left", paddingLeft: "5%" }}>←</h3></Link>
            <div className='ShopDetailContainer'>
                <div className='ShopDetailTop'><img src={`../picture/shop${detailproduct.id}.JPG`} alt="" /></div>
                <div className='ShopDetailSection'>
                    <IntroDivider className="IntroDivider"></IntroDivider>
                </div>

                <button className='ShopDetailBottomBt'>Continue</button>

            </div>
        </div>

    )
};
export default ShopDetail;