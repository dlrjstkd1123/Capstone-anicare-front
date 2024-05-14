import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';  // 경로 확인 필요

import './VocQuestion.css';

function VocQuestion() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');  // 필드 이름 변경
  const { accessToken, userAccountname } = useContext(AuthContext);

  const handleQuestionSubmit = async () => {
    const body = {
        title: title,
        contents: contents,  // 필드 이름 변경
        username: userAccountname  // 작성자 이름 추가
    };
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    };

    await axios.post('http://3.38.225.120:8080/api/post', body, { headers })
      .then((response) => {
        console.log('status : ' + response.status);
      }).catch((error) => {
        console.log('error : ' + error);
      });
  };

  return (
    <>
      <h2 align="center">게시글 작성</h2>
      <div className="voc-view-wrapper">
          <div className="voc-view-row">
              <label>제목</label>
              <input type="text" onChange={(event) => setTitle(event.target.value)}></input>
          </div>
          <div className="voc-view-row">
              <label>내용</label>
              <textarea onChange={(event) => setContents(event.target.value)}></textarea>
          </div>
          <button className="voc-view-go-list-btn" onClick={handleQuestionSubmit}>등록</button>
      </div>
    </>
  );
}

export default VocQuestion;
