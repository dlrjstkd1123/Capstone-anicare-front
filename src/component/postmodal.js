import React, { useRef, useState, useContext, useEffect } from 'react';
import * as S from './Modal.style';
import AlertModal from './AlertModal';
import { useNavigate } from 'react-router-dom';
import { AuthContextStore } from '../../../context/AuthContext';
import { deletePost, reportPost } from '../../../api/post';

const PostModal = ({ onClose, postId, posts, setPosts, postAuthor, author, pathname }) => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const { userToken, userAccountname } = useContext(AuthContextStore);
  const myPostModalOptions = useMemo(() => ['삭제', '수정'], []);
  const otherPostModalOptions = useMemo(() => ['신고하기'], []);

  const isAuthor = author?.accountname === userAccountname;
  
  useEffect(() => {
    setIsLoginUser(userAccountname === postAuthor);
  }, [userAccountname, postAuthor]);

  console.log(postAuthor);

  const optionClick = (option) => {
    if (option === '삭제') {
      setSelectedOption(option);
    } else if (option === '수정') {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === postId) {
          console.log('Navigating to Edit Page');
          navigate('/post/edit/', {
            state: { content: posts[i].content, image: posts[i].image, postId: posts[i].id },
          });
        }
      }
    } else if (option === '신고하기') {
      setSelectedOption(option);
    }
  };

  const closeModal = async (option) => {
    if (option === '삭제') {
      await fetchDelete(postId, userToken);
      setPosts(posts.filter((post) => post.id !== postId));
      if (pathname === `/postdetail/${postId}`) {
        navigate(-1);
      }
      onClose();
    } else if (option === '취소') {
      setSelectedOption('');
      onClose();
    } else if (option === '확인') {
      fetchReport(postId, userToken);
      console.log('신고하기 완료!');
      onClose();
    }
  };

  const fetchDelete = async () => {
    try {
      await deletePost(postId, userToken);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReport = async () => {
    try {
      await reportPost(postId, userToken);
    } catch (error) {
      console.error(error);
    }
  };

  const clickOutside = (e) => {
    if (modalRef.current && modalRef.current === e.target) {
      onClose();
    }
  };

  const optionElements = () => {
    if (!isLoginUser && !isAuthor) {
      return otherPostModalOptions.map((option, index) => (
        <S.Li key={index}>
          <button onClick={() => optionClick(option)}>{option}</button>
        </S.Li>
      ));
    } else if (isLoginUser || isAuthor) {
      return myPostModalOptions.map((option, index) => (
        <S.Li key={index}>
          <button onClick={() => optionClick(option)}>{option}</button>
        </S.Li>
      ));
    }
  };

  return (
    <>
      <S.ModalBg ref={modalRef} onClick={clickOutside} style={{ pointerEvents: selectedOption ? 'none' : 'auto' }}>
        <S.Ul>{optionElements()}</S.Ul>
      </S.ModalBg>
      {selectedOption === '삭제' && (
        <AlertModal
          message='게시글을 삭제할까요?'
          onClose={closeModal}
          buttons={[
            { text: '취소', color: 'inherit' },
            { text: '삭제', color: '#Fd7a6E' },
          ]}
          />
      )}
      {selectedOption === '신고하기' && (
        <AlertModal
          message='신고가 완료되었습니다!'
          onClose={closeModal}
          buttons={[{ text: '확인', color: '#Fd7a6E' }]}
          />
      )}
      </>
    );
  };
  
  export default PostModal;