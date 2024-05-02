import React, { useRef, useState, useContext, useEffect } from 'react';
import * as S from './Modal.style';
import { AuthContextStore } from '../../../context/AuthContext';
import { reportComment } from '../../../api/comment';
import { deleteComment } from '../../../api/comment';
import AlertModal from './AlertModal';

const CommentModal = ({ onClose, commentId, commentList, postId, commentAuthor, setCommentList, setCommentCnt }) => {
  const modalRef = useRef();
  const { userToken, userAccountname } = useContext(AuthContextStore);
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  
  useEffect(() => {
    setIsLoginUser(userAccountname === commentAuthor);
  }, [userAccountname, commentAuthor]);

  const optionClick = async (option) => {
    if (option === '삭제') {
      await fetchDelete();
      setCommentList(commentList.filter((comment) => comment.id !== commentId));
      setCommentCnt((prev) => prev - 1);
      onClose();
    } else if (option === '신고하기') {
      setSelectedOption(option);
    }
  };

  const closeModal = (option) => {
    if (option === '확인') {
      fetchReport();
      console.log('신고하기 완료!');
      onClose();
    }
  };

  const fetchDelete = async () => {
    console.log('postId 값:', postId);
    console.log('commentId 값:', commentId);
    try {
      await deleteComment(postId, commentId, userToken);
    } catch (error) {
      console.log('댓글 삭제 오류:', error);
      return { success: false, error: '댓글 삭제 오류' };
    }
  };

  const fetchReport = async () => {
    try {
      await reportComment(postId, commentId, userToken);
    } catch (error) {
      console.log(error);
    }
  };

  const renderAlertModal = () => {
    if (selectedOption === '신고하기') {
      return (
        <AlertModal
          message='신고가 완료되었습니다!'
          onClose={closeModal}
          buttons={[{ text: '확인', color: '#Fd7a6E' }]}
          />
      );
    }
    return null;
  };

  const clickOutside = (e) => {
    if (modalRef.current && modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <>
      <S.ModalBg ref={modalRef} onClick={clickOutside} style={{ pointerEvents: selectedOption ? 'none' : 'auto' }}>
        <S.Ul>
          {isLoginUser ? (
            <S.Li>
              <button onClick={() => optionClick('삭제')}>삭제</button>
            </S.Li>
          ) : (
            <S.Li>
              <button onClick={() => optionClick('신고하기')}>신고하기</button>
            </S.Li>
          )}
        </S.Ul>
      </S.ModalBg>
      {renderAlertModal()}
      </>
    );
  };