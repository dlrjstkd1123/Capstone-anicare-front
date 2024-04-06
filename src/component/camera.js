import '../css/Camera.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'

import axios from 'axios';
import * as LR from '@uploadcare/blocks';

import React, { useEffect, useState } from 'react';

function Camera() {
    const [isScrolled, setIsScrolled] = useState(false);
    let [cammodal, setCammodal] = useState(false);
    
    // Cammodal 컴포넌트에서 파일 업로드를 위한 상태와 함수
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    
    const handleUpload = () => {
        alert("Dd")
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://example.com/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            // 파일 업로드 성공 시 실행되는 코드
            alert("Tq?")
            console.log('File uploaded successfully:', response.data);
        }).catch(error => {
            // 파일 업로드 실패 시 실행되는 코드
            console.error('Error uploading file:', error);
            alert("tq")
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
        <div className="Mainpage">
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
            <div className="CameraContainer">
                <div className="CameraLogo">
                    <img src="../picture/camera.png" onClick={() => {
                        setCammodal(!cammodal)
                    }}/>
                </div>
                <div className="PhotoUpload">
                    {/* Cammodal 컴포넌트에 상태와 함수를 전달 */}
                    {cammodal && <Cammodal file={file} handleFileChange={handleFileChange}  />}
                </div>
                {/* handleUpload 함수를 버튼의 onClick 이벤트에 연결 */}
                <button className="CameraButton" onClick={handleUpload}></button>
                <button className="CameraButton"></button>
            </div>
        </div>
    );
}

function Cammodal({ file, handleFileChange }) {
    LR.registerBlocks(LR);

    return (
        <div style={{ marginTop: "50px" }}>
            <lr-config
                className="uploadFile"
                ctx-name="my-uploader"
                pubkey="3794841bbf4a26b82e2c"
                maxLocalFileSizeBytes={10000000}
                imgOnly={true}
                sourceList="local, camera"
            ></lr-config>
            <lr-file-uploader-regular
                css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css"
                ctx-name="my-uploader"
                class="my-config"
                onChange={handleFileChange}
            >
                {file && <img src={URL.createObjectURL(file)} alt="Uploaded File" />}
            </lr-file-uploader-regular>
            {/* handleUpload 함수를 호출하는 버튼 */}
            
            
        </div>
    );
}

export default Camera;