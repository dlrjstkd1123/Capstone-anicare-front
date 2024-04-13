import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import '../css/Vaccin.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function VaccinPage() {

    const [isScrolled, setIsScrolled] = useState(false);
    let [vaccin, SetVaccin] = useState(null);
    let [vaccinyn, SetVaccinYn] = useState(null);
    let [startDate, setStartDate] = useState(new Date());
    const [mainlist, Setmainlist] = useState(["접종"]); // 상태를 배열로 초기화
    const ReactDatePicker = () => {


        return (
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy년-MM월-dd일"
                />
            </div>
        );
    };
    const formattedDate = startDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const VaccinPost = (vaccin, vaccinyn, formattedDate) => {
        let vaccindata = {
            vaccintype: vaccin,
            vaccinyn: vaccinyn,
            vaccindate: formattedDate
        }

        axios.post('/url', vaccindata)
            .then(response => {
                console.log('분석 요청이 서버로 전송되었습니다.');
            })
            .catch(error => {
                console.error('분석 요청을 서버로 전송하는 중 오류가 발생했습니다:', error);
            });
    };

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            if (position > 100) {
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
        <div className="Vaccinpage">
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
                    <Link to="/main" style={{ textDecoration: "none" }}>
                        <div>
                            <img src="/home.png" alt="" style={{ width: "20px" }} />
                        </div>
                    </Link>
                </div>

            </div>
            <div className='MainTopLogoBox'>
                <div className='MainSectionTopBox' style={{ marginTop: "0px" }}>


                    <h5 style={{ marginTop: "30px", marginBottom: "10px", color: "grey" }}>자신의 반려견 또는 유기견을 찍어보세요!</h5>
                    <h2 style={{ margin: "0" }}>질병분석,견종분석 기능 포함</h2>
                    <Link to="/camera"><button className='MainSectionTopButton'>촬영하러 가기</button></Link>
                </div>
            </div>
            
            <Grid className='GridContainer' container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item xs={6}>
                    <button className={vaccin === "파보바이러스감염증" ? "VaccinSelected" : ""} onClick={() => {
                        SetVaccin("파보바이러스감염증")
                    }} >파보바이러스감염증</button>
                </Grid>
                <Grid item xs={6}>
                    <button className={vaccin === "파라인플루엔자" ? "VaccinSelected" : ""} onClick={() => {
                        SetVaccin("파라인플루엔자")
                    }}>파라인플루엔자</button>
                </Grid>
                <Grid item xs={6}>
                    <button className={vaccin === "디스템퍼" ? "VaccinSelected" : ""} onClick={() => {
                        SetVaccin("디스템퍼")
                    }}>디스템퍼</button>
                </Grid>
                <Grid item xs={6}>
                    <button className={vaccin === "코로나바이러스" ? "VaccinSelected" : ""} onClick={() => {
                        SetVaccin("코로나바이러스")
                    }}>코로나바이러스</button>
                </Grid>
                <Grid item xs={6}>
                    <button className={vaccin === "호흡기감염" ? "VaccinSelected" : ""} onClick={() => {
                        SetVaccin("호흡기감염")
                    }}>호흡기감염</button>
                </Grid>
                <Grid item xs={6}>
                    <button className={vaccin === "광견병" ? "VaccinSelected" : ""} onClick={() => {
                        SetVaccin("광견병")
                    }}>광견병</button>
                </Grid>
            </Grid>
            <p style={{ fontWeight: "700" }}>과거 접종 여부</p>
            <Grid className='GridContainer' container rowSpacing={3.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item xs={6}>
                    <button className={vaccinyn === 0 ? "VaccinSelected" : ""} onClick={() => {
                        SetVaccinYn(0)
                    }} >예</button>
                </Grid>
                <Grid item xs={6}>
                    <button className={vaccinyn === 1 ? "VaccinSelected" : ""} onClick={() => {
                        SetVaccinYn(1);
                        console.log(formattedDate)
                    }}>아니오</button>
                </Grid>
            </Grid>
            <p style={{ fontWeight: "700" }}>과거 접종 날짜</p>
            <ReactDatePicker className="DatePicker"></ReactDatePicker>
            <button className='VaccinButton' onClick={() => {
                VaccinPost(vaccin, vaccinyn, startDate);
            }}>분석하기</button>

        </div>
    )
};

export default VaccinPage;