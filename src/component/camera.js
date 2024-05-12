import '../css/Camera.css';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';
import axios from 'axios';
import * as LR from '@uploadcare/blocks';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faAngleLeft, faHouse } from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useState, useRef } from 'react';
LR.registerBlocks(LR);
function Camera() {
    const navigate = useNavigate();
    const [mainlist, Setmainlist] = useState(["카메라"]); // 상태를 배열로 초기화
    const [files, setFiles] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const ctxProviderRef = useRef(null);
    const handleLogout = () => {
        // 로컬 스토리지에서 토큰 삭제
        localStorage.removeItem('accessToken');
        navigate('/login');
        // 로그인 상태 업데이트
        // 이 부분은 필요에 따라 추가적인 처리를 할 수 있습니다.
    };

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
        if (files.length === 0) {
            setImageUrl("cameralogo.png");
        } else {
            const file = files[0].file;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageUrl(reader.result);
            };
        }
    }, [files]); // files 상태가 변경될 때만 호출됩니다.

    // 초기 렌더링 시에도 호출되도록 추가
    useEffect(() => {
        if (files.length === 0) {
            setImageUrl("../picture/사진등록.JPG");
        }
    }, []);
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

            <div className={`CameraContainer ${cammodal ? 'active' : ''}`} style={{ height: "850px" }}>
                {/* <div className="CameraLogo" style={{ marginTop: "160px" }} >
                    <img src="../picture/camera.png" />
                </div> */}
                <div className="PhotoUpload" style={{ marginTop: "140px" }}>
                    {/* Cammodal 컴포넌트에 상태와 함수를 전달 */}
                    <div >
                        <div className='UploadPhotoSeeContainer'>

                            <div className='UploadPhotoSee'style={{ marginBottom: "30px" }}>
                                <img src={imageUrl} alt="Uploaded" />
                            </div>
                        </div>
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

                        <div className='CameraButtonContainer'>
                            {/* handleUpload 함수를 호출하는 버튼 */}
                            <button className="CameraButton" onClick={() => {
                                if (files.length === 0) {
                                    alert("사진을 선택하세요")
                                }
                                else {
                                    let 토큰검사 = localStorage.getItem("accessToken")
                                    const formData = new FormData();
                                    formData.append('image', files[0].file); // 파일 직접 업로드

                                    for (const pair of formData.entries()) {
                                        console.log(pair[0], pair[1]);
                                    }
                                    axios.post('http://3.38.225.120:8080/api/images', formData, {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                            'token': 토큰검사
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
                            <button className="CameraButton" onClick={() => {

                                if (files.length === 0) {
                                    alert("사진을 선택하세요")
                                }
                                else {
                                    let 토큰검사 = localStorage.getItem("accessToken")
                                    const formData = new FormData();
                                    formData.append('image', files[0].file); // 파일 직접 업로드

                                    for (const pair of formData.entries()) {
                                        console.log(pair[0], pair[1]);
                                    }
                                    axios.post('http://3.38.225.120:8080/api/images', formData, {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                            // 'token': 토큰검사

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

                            }}>질병 분석하기</button>
                        </div>
                    </div>
                </div>
                {/* handleUpload 함수를 버튼의 onClick 이벤트에 연결 */}

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

        </div>
    );
}



export default Camera;