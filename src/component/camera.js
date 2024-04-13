import '../css/Camera.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';
import axios from 'axios';
import * as LR from '@uploadcare/blocks';

import React, { useEffect, useState, useRef } from 'react';
LR.registerBlocks(LR);
function Camera() {
    const [mainlist, Setmainlist] = useState(["카메라"]); // 상태를 배열로 초기화
    const [files, setFiles] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
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
    useEffect(() => {
        if (files.length > 0) {
            const file = files[0].file; // 첫 번째 파일만 고려
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageUrl(reader.result);
            };
        }
    }, [files]);
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
        setCammodal(true);
    }, [])
    return (
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

            <div className={`CameraContainer ${cammodal ? 'active' : ''}`}>
                <div className="CameraLogo" >
                    <img src="../picture/camera.png" />
                </div>
                <div className="PhotoUpload">
                    {/* Cammodal 컴포넌트에 상태와 함수를 전달 */}
                    <div style={{ marginTop: "30px" }}>
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
                        <div className='UploadPhotoSee'>
                            <img src={imageUrl} alt="Uploaded" />
                        </div>
                        <div className='CameraButtonContainer'>
                            {/* handleUpload 함수를 호출하는 버튼 */}
                            <button className="CameraButton" onClick={() => {
                                if (files.length === 0) {
                                    alert("사진을 선택하세요")
                                }
                                else {

                                    const formData = new FormData();
                                    formData.append('image', files[0].file); // 파일 직접 업로드

                                    for (const pair of formData.entries()) {
                                        console.log(pair[0], pair[1]);
                                    }
                                    // axios.post('http://example.com/upload', formData, {
                                    //     headers: {
                                    //         'Content-Type': 'multipart/form-data'
                                    //     }
                                    // }).then(response => {
                                    //     // 파일 업로드 성공 시 실행되는 코드
                                    //     console.log('File uploaded successfully:', response.data);
                                    //     alert("파일이 성공적으로 업로드되었습니다.");
                                    // }).catch(error => {
                                    //     // 파일 업로드 실패 시 실행되는 코드
                                    //     console.error('Error uploading file:', error);
                                    //     alert("파일 업로드 중 오류가 발생했습니다.");
                                    // });
                                }

                            }}>종 분석하기</button>
                            <button className="CameraButton">
                                질병 분석하기
                            </button>
                        </div>
                    </div>
                </div>
                {/* handleUpload 함수를 버튼의 onClick 이벤트에 연결 */}

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
                <Link to="/main" style={{ textDecoration: "none", color: "black" }}>
                    <div>
                        <img src="/home.png" alt="" style={{ width: "20px" }} />
                    </div>
                </Link>
            </div>

        </div>
    );
}



export default Camera;