import '../css/Shop.css';

import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faAngleLeft,faHouse } from "@fortawesome/free-solid-svg-icons";


function ShopDetail(props) {
    const navigate = useNavigate();
    const [mainlist, Setmainlist] = useState(["상점"]);
    let { id } = useParams();
    let detailproduct = props.shop.find(function (x) {
        return x.id == id
    });
    const IntroDivider = () => {
        return (
            <Card variant="outlined" sx={{ maxWidth: 350 }}>
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography gutterBottom variant="h6" component="div" style={{ fontSize: "17px" }}>
                            {detailproduct.product}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" style={{ fontSize: "15px" }}>
                            {detailproduct.price}
                        </Typography>
                    </Stack>
                    <Typography color="text.secondary" variant="body2" style={{ fontSize: "12px" }}>
                        {detailproduct.content}
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Typography gutterBottom variant="body2">
                        <ButtonGroup variant="contained" aria-label="Basic button group"
                            style={{ width: "60%", backgroundColor: "#45A8F0" }}>
                            <Button style={{ backgroundColor: "#5baee9", fontWeight: "600" }} className='ShopDetailButton'>-</Button>
                            <Button style={{ backgroundColor: "#5baee9", fontWeight: "600" }} className='ShopDetailButton'>+</Button>
                        </ButtonGroup>
                    </Typography>

                </Box>
            </Card>
        );
    }
    const [isScrolled, setIsScrolled] = useState(false);


    return (
        <div className="Mainpage">
            <div className={`MainTopNav ${isScrolled ? 'hidden' : ''}`}>
                <div>

                    <p className='Logoname'>에케플</p>

                </div>
                <div className="MainTopNavListBox">
                    <Link to="/shop" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "상점" ? "active" : ""}`} onClick={() => {
                        let copy = [...mainlist];
                        copy[0] = "상점";
                        Setmainlist(copy)
                    }}>상  점</p></Link>
                    <Link to="/shop" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "게시판" ? "active" : ""}`} onClick={() => {
                        let copy = [...mainlist];
                        copy[0] = "게시판";
                        Setmainlist(copy)
                    }}>게시판</p></Link>
                    <Link to="/camera" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "지도" ? "active" : ""}`} onClick={() => {
                        let copy = [...mainlist];
                        copy[0] = "지도";
                        Setmainlist(copy)
                    }}>지도</p></Link>
                    <Link to="/vaccin" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "접종" ? "active" : ""}`} onClick={() => {
                        let copy = [...mainlist];
                        copy[0] = "접종";
                        Setmainlist(copy)
                    }}>접종</p></Link>


                </div>
            </div>
            <div className='MainBottomNav'>
                <Link to="/main" style={{ textDecoration: "none", color: "#9a9a9a" }}>
                    <div>
                        <FontAwesomeIcon icon={faHouse} />
                    </div>
                </Link>
                <Link to="/camera" style={{ textDecoration: "none", color: "#9a9a9a" }}>
                    <div>
                        <FontAwesomeIcon icon={faCamera} />
                    </div>
                </Link>

                <div>
                    <FontAwesomeIcon icon={faAngleLeft} onClick={() => {
                        navigate(-1)
                    }} />

                </div>

            </div>
            {/* 여기서부터 shopdetail html */}
            <Link to="/shop"><h3 style={{ paddingTop: "10px", textAlign: "left", paddingLeft: "5%" }}>←</h3></Link>
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