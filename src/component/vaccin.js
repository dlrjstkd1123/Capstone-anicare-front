import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import '../css/Vaccin.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function VaccinPage() {
   
    const [isScrolled, setIsScrolled] = useState(false);
    let [vaccin,SetVaccin] = useState(null);
    let [vaccinyn,SetVaccinYn] = useState(null);
    let [startDate, setStartDate] = useState(new Date());

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
            <div className={`MainTopNav ${isScrolled ? 'hidden' : ''}`}>
                <p>AniCare</p>
            </div>
            <div className='MainBottomNav'>
                <Link to="/main" style={{ textDecoration: "none", color: "black" }}>
                    <div style={{ marginLeft: "20px" }}>
                        <img src="/home.png" alt="" style={{ width: "20px", marginRight: "10px" }} />
                        Home
                    </div>
                </Link>
                <div style={{ marginRight: "20px" }}>Logout</div>
            </div>
            <h3 style={{ paddingTop: "110px", textAlign: "left", paddingLeft: "5%" }}>←</h3>
            <Grid className='GridContainer' container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item xs={6}>
                    <button className={vaccin === "파보바이러스감염증" ? "VaccinSelected" : ""} onClick={()=>{
                        SetVaccin("파보바이러스감염증")
                    }} >파보바이러스감염증</button>
                </Grid>
                <Grid item xs={6}>
                    <button className={vaccin === "파라인플루엔자" ? "VaccinSelected" : ""} onClick={()=>{
                        SetVaccin("파라인플루엔자")
                    }}>파라인플루엔자</button>
                </Grid>
                <Grid item xs={6}>
                    <button className={vaccin === "디스템퍼" ? "VaccinSelected" : ""} onClick={()=>{
                        SetVaccin("디스템퍼")
                    }}>디스템퍼</button>
                </Grid>
                <Grid item xs={6}>
                    <button className={vaccin === "코로나바이러스" ? "VaccinSelected" : ""} onClick={()=>{
                        SetVaccin("코로나바이러스")
                    }}>코로나바이러스</button>
                </Grid>
                <Grid item xs={6}>
                    <button className={vaccin === "호흡기감염" ? "VaccinSelected" : ""} onClick={()=>{
                        SetVaccin("호흡기감염")
                    }}>호흡기감염</button>
                </Grid>
                <Grid item xs={6}>
                    <button className={vaccin === "광견병" ? "VaccinSelected" : ""} onClick={()=>{
                        SetVaccin("광견병")
                    }}>광견병</button>
                </Grid>
            </Grid>
            <p style={{fontWeight:"700"}}>과거 접종 여부</p>
            <Grid className='GridContainer' container rowSpacing={3.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item xs={6}>
                    <button className={vaccinyn === 0 ? "VaccinSelected" : ""} onClick={()=>{
                        SetVaccinYn(0)
                    }} >예</button>
                </Grid>
                <Grid item xs={6}>
                    <button className={vaccinyn === 1 ? "VaccinSelected" : ""} onClick={()=>{
                        SetVaccinYn(1);
                       
                    }}>아니오</button>
                </Grid>
            </Grid>
            <p style={{fontWeight:"700"}}>과거 접종 날짜</p>
            <ReactDatePicker className="DatePicker"></ReactDatePicker>
            <button className='VaccinButton'>분석하기</button>
            
        </div>
    )
};

export default VaccinPage;