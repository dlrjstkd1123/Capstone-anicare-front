import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../css/map.css';
import React, { useEffect, useState } from 'react';
import { Card, List, ListItem, ListItemButton, ListItemText, Typography, Divider, Box, Fab, BottomNavigation, BottomNavigationAction, Tab, Tabs } from '@mui/material';
import { Add as AddIcon, Folder as FolderIcon, Restore as RestoreIcon, Favorite as FavoriteIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCamera, faAngleLeft } from '@fortawesome/free-solid-svg-icons'; // 이 부분을 추가

function Board(props) {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [mainlist, Setmainlist] = useState(["게시판"]); // mainlist와 Setmainlist를 추가하거나 가져옵니다.
    const handleLogout = () => {
        // 로컬 스토리지에서 토큰 삭제
        localStorage.removeItem('accessToken');
        navigate('/login');
        // 로그인 상태 업데이트
        // 이 부분은 필요에 따라 추가적인 처리를 할 수 있습니다.
    };
    const handleWriteClick = () => {
        navigate('/write');
    };

    const handleItemClick = (id) => {
        navigate(`/posts/${id}`);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const data = [
        {
            id: 1,
            src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
            title: 'Night view',
            description: '4.21M views',
            likes: '2.3K likes',
        },
        {
            id: 2,
            src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
            title: 'Lake view',
            description: '4.74M views',
            likes: '3.1K likes',
        },
        {
            id: 3,
            src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
            title: 'Mountain view',
            description: '3.98M views',
            likes: '1.9K likes',
        },
    ];


    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            <div className={`MainTopNav ${isScrolled ? 'hidden' : ''}`}style={{marginBottom:"80px"}}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    <p className='Logoname'>에케플</p>
                    <p className='Logout' onClick={handleLogout}>로그아웃</p>
                </div>
                <div className="MainTopNavListBox">
                    <Link to="/shop" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "상점" ? "active" : ""}`} onClick={() => {
                        let copy = [...mainlist];
                        copy[0] = "상점";
                        Setmainlist(copy)
                    }}>상  점</p></Link>
                    <Link to="/board" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "게시판" ? "active" : ""}`} onClick={() => {
                        let copy = [...mainlist];
                        copy[0] = "게시판";
                        Setmainlist(copy)
                    }}>게시판</p></Link>
                    <Link to="/map" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "지도" ? "active" : ""}`} onClick={() => {
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
            <Tabs value={tabValue} onChange={handleTabChange} centered style={{paddingTop:"120px"}}>
                <Tab label="All" />
                <Tab label="Popular" />
                <Tab label="Recent" />
                <Tab label="Favorites" />
            </Tabs>
            <Card variant="outlined" sx={{ margin: 'auto', mt: 2, mb: 2, maxWidth: 500 }}>
                <List sx={{ py: 'var(--ListDivider-gap)' }}>
                    {data.map((item, index) => (
                        <React.Fragment key={item.title}>
                            <ListItem>
                                <ListItemButton sx={{ gap: 2 }} onClick={() => handleItemClick(item.id)}>
                                    {/* MainBottomNav의 내용 */}
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
                                    <ListItemText>
                                        <Typography fontWeight="md">{item.title}</Typography>
                                        <Typography level="body-sm">{item.description}</Typography>
                                        <Typography level="body2" color="text.secondary">{item.likes}</Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                            {index !== data.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </Card>
            <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 70, right: 16 }} onClick={handleWriteClick}>
                <AddIcon />
            </Fab>
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
        </Box>
    );
}

export default Board;
