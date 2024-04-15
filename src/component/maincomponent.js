import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera,faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useRef, } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
function Main() {
    
    let [mainlist,Setmainlist] = useState("")
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const totalImages = 3;
    const handleNextClick = () => {
        setCurrentImageIndex(currentImageIndex => (currentImageIndex + 1)%totalImages);
    };

    const handlePreviousClick = () => {
        setCurrentImageIndex(currentImageIndex =>(currentImageIndex - 1 + totalImages)%totalImages);
    };
    const translateValue = -currentImageIndex * 100;
    return (

        <div style={{ overflowX: "hidden" }}>
            <div className='MainTopLogoBox'>
                <div className='MainSectionTopBox' style={{ marginTop: "5px" }}>


                    <h5 style={{ marginTop: "30px", marginBottom: "10px", color: "grey" }}>자신의 반려견 또는 유기견을 찍어보세요!</h5>
                    <h2 style={{ margin: "0" }}>질병분석,견종분석 기능 포함</h2>
                    <Link to="/camera"><button className='MainSectionTopButton'>촬영하러 가기</button></Link>
                </div>
            </div>
            <div className='MainSectionLogoBox'style={{ transform: `translateX(${translateValue}vw)` }} >
                <div className='MainSectionLogoBoxSection' >
                    <div className="flex-container">
                        <img className="mainSectionImg" src="../picture/포메.jpg" alt="" />
                        <span style={{ marginRight: "30%", marginTop: "5%" }} className="mainSectionText">포메라니안</span>
                    </div>

                    <div className='MainSectionLogo' style={{ marginTop: "20px" }}>
                        <p>10대 인기층</p>
                        <div className="MainSecionGage" style={{ width: "60%", backgroundColor: "#e84f13", height: "10px" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>20대 인기층</p>
                        <div className="MainSecionGage" style={{ width: "50%", backgroundColor: "#e84f13", height: "10px" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>30대 인기층</p>
                        <div className="MainSecionGage" style={{ width: "50%", backgroundColor: "#e84f13", height: "10px" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>40대 인기층</p>
                        <div className="MainSecionGage" style={{ width: "20%", backgroundColor: "#e84f13", height: "10px" }}></div>
                    </div>
                </div>
                <div className='MainSectionLogoBoxSection'>
                    <div className="flex-container">
                        <img className="mainSectionImg" src="../picture/시바견.jpg" alt="" />
                        <span style={{ marginRight: "30%", marginTop: "5%" }} className="mainSectionText">시바견</span>
                    </div>

                    <div className='MainSectionLogo' style={{ marginTop: "20px" }}>
                        <p>10대 인기층</p>
                        <div className="MainSecionGage" style={{ width: "60%", backgroundColor: "#e84f13", height: "10px" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>20대 인기층</p>
                        <div className="MainSecionGage" style={{ width: "40%", backgroundColor: "#e84f13", height: "10px" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>30대 인기층</p>
                        <div className="MainSecionGage" style={{ width: "20%", backgroundColor: "#e84f13", height: "10px" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>40대 인기층</p>
                        <div className="MainSecionGage" style={{ width: "20%", backgroundColor: "#e84f13", height: "10px" }}></div>
                    </div>
                </div>
                <div className='MainSectionLogoBoxSection'>
                    <div className="flex-container">
                        <img className="mainSectionImg" src="../picture/리트리버.jpg" alt="" />
                        <span style={{ marginRight: "30%", marginTop: "5%" }} className="mainSectionText">리트리버</span>
                    </div>

                    <div className='MainSectionLogo' style={{ marginTop: "20px" }}>
                        <p>10대 인기층</p>
                        <div className="MainSecionGage" style={{ width: "20%", backgroundColor: "#e84f13", height: "10px" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>20대 인기층</p>
                        <div className="MainSecionGage" style={{ width: "10%", backgroundColor: "#e84f13", height: "10px" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>30대 인기층</p>
                        <div className="MainSecionGage" style={{ width: "10%", backgroundColor: "#e84f13", height: "10px" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>40대 인기층</p>
                        <div className="MainSecionGage" style={{ width: "60%", backgroundColor: "#e84f13", height: "10px" }}></div>
                    </div>
                </div>

            </div>

            <button className="before" onClick={handlePreviousClick}>이전</button>
            <button style={{ marginBottom: "80px" }} className="next" onClick={handleNextClick}>다음</button>
        </div>

    )
}
export default Main;