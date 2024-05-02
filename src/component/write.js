import React, { useState } from 'react';
import { createPost } from './writepost'; // 여기에 포스트 생성 함수를 가져오세요.

const Write = ({ userToken }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 이미지를 업로드할 경우에도 이 부분에 이미지 업로드 함수를 추가하세요.
      await createPost(userToken, content, image);
      // 게시물이 성공적으로 작성되었을 때의 처리를 추가하세요.
    } catch (err) {
      setError(err.message); // 에러 메시지 처리
    }
  };

  return (
    <div>
      <h2>Write a Post</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Write your post..."
          required
        ></textarea>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default Write;
