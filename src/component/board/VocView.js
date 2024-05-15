import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './VocView.css';

function VocView() {
  const { vocId } = useParams();  // URL 매개변수에서 vocId를 가져옵니다
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.38.225.120:8080/api/post/${vocId}`);
        setPost(response.data.response); // response.data.response에서 post 데이터 추출
      } catch (error) {
        console.error("Error fetching the post data:", error);
      }
    };

    fetchData();
  }, [vocId]);

  return (
    <>
      <h2 align="center">게시글 상세정보</h2>
      <div className="voc-view-wrapper">
        <div className="voc-view-row">
          <label>게시글 번호</label>
          <label>{post.id}</label>
        </div>
        <div className="voc-view-row">
          <label>제목</label>
          <label>{post.title}</label>
        </div>
        <div className="voc-view-row">
          <label>작성일</label>
          <label>{post.createdAt}</label>
        </div>
        <div className="voc-view-row">
          <label>내용</label>
          <div>
            {post.contents}
          </div>
        </div>
      </div>
    </>
  );
}

export default VocView;
