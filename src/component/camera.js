import '../css/Camera.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';
import axios from 'axios';
import * as LR from '@uploadcare/blocks';

import React, { useEffect, useState, useRef } from 'react';
LR.registerBlocks(LR);
function Camera() {
    const [isScrolled, setIsScrolled] = useState(false);
    let [cammodal, setCammodal] = useState(false);

    // Cammodal 컴포넌트에서 파일 업로드를 위한 상태와 함수
   


    // const handleUpload = () => {
    //     console.log(file)
    //     if (!file) return;

    //     const formData = new FormData();
    //     formData.append('file', file);

    //     axios.post('http://example.com/upload', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     }).then(response => {
    //         // 파일 업로드 성공 시 실행되는 코드
    //         alert("Tq?")
    //         console.log('File uploaded successfully:', response.data);
    //     }).catch(error => {
    //         // 파일 업로드 실패 시 실행되는 코드
    //         console.error('Error uploading file:', error);
    //         alert("tq")
    //     });
    // };

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
                    }} />
                </div>
                <div className="PhotoUpload">
                    {/* Cammodal 컴포넌트에 상태와 함수를 전달 */}
                    {cammodal && <Cammodal />}
                </div>
                {/* handleUpload 함수를 버튼의 onClick 이벤트에 연결 */}

            </div>
        </div>
    );
}

function Cammodal( ) {
    const [files, setFiles] = useState([]);
    const ctxProviderRef = useRef(null);

    useEffect(() => {
        const ctxProvider = ctxProviderRef.current;
        if (!ctxProvider) return;

        const handleChangeEvent = (event) => {
            setFiles([...event.detail.allEntries.filter((file) => file.status === 'success')]);
        };

        ctxProvider.addEventListener('change', handleChangeEvent);

        return () => {
            ctxProvider.removeEventListener('change', handleChangeEvent);
        };
    }, [setFiles]);

    return (
        <div style={{ marginTop: "50px" }}>
            <div className='UploadCare'>
                <lr-config
                    ctx-name="my-uploader"
                    pubkey="ac19ec4b2870c4ca0de0"
                    multiple={false}
                    imgOnly={true}
                    maxLocalFileSizeBytes={10000000}
                    sourceList="local, camera"
                />

                <lr-file-uploader-regular
                    ctx-name="my-uploader"
                    css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css"
                />

                <lr-upload-ctx-provider
                    ctx-name="my-uploader"
                    ref={ctxProviderRef}
                />
            </div>

            {/* handleUpload 함수를 호출하는 버튼 */}
            <button className="CameraButton" onClick={() => {
                if (files.length === 0) {
                    alert("사진을 선택하세요")
                }
                else {
                    
                    const formData = new FormData();
                    formData.append('image', files[0].file); // 파일 직접 업로드
                    console.log(files[0].gifile)
                    axios.post('http://example.com/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(response => {
                        // 파일 업로드 성공 시 실행되는 코드
                        console.log('File uploaded successfully:', response.data);
                        alert("파일이 성공적으로 업로드되었습니다.");
                    }).catch(error => {
                        // 파일 업로드 실패 시 실행되는 코드
                        console.error('Error uploading file:', error);
                        alert("파일 업로드 중 오류가 발생했습니다.");
                    });
                }

            }}>종 분석하기</button>
            <button className="CameraButton">
                질병 분석하기
            </button>

        </div>
    );
}

export default Camera;