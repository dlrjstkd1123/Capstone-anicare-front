import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';  // 경로 확인 필요

import './VocQuestion.css';

function VocQuestion() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const { accessToken } = useContext(AuthContext);

  const handleQuestionSubmit = async () => {
    const body = {
      title: title,
      contents: contents
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    };

    try {
      const response = await axios.post('http://3.38.225.120:8080/api/post', body, { headers });
      console.log('status : ' + response.status);
      console.log('response data : ', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error response data: ', error.response.data);
        console.error('Error response status: ', error.response.status);
        console.error('Error response headers: ', error.response.headers);
      } else if (error.request) {
        console.error('Error request: ', error.request);
      } else {
        console.error('Error message: ', error.message);
      }
    }
  };

  return (
    <>
      <h2 align="center">게시글 작성</h2>
      <div className="voc-view-wrapper">
        <div className="voc-view-row">
          <label>제목</label>
          <input type="text" onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="voc-view-row">
          <label>내용</label>
          <textarea onChange={(event) => setContents(event.target.value)} />
        </div>
        <button className="voc-view-go-list-btn" onClick={handleQuestionSubmit}>등록</button>
      </div>
    </>
  );
}

export default VocQuestion;
