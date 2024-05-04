import { request } from './request';

// 특정 게시물 정보 가져오기
export const getSinglePost = async (postId, userToken) => {
  return await request(`post/${postId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${userToken}` },
  });
};

// 게시물 수정
export const editPost = async (postId, userToken, content, image) => {
  return await request(`post/${postId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({ post: { content, image } }),
  });
};

// 게시물 삭제
export const deletePost = async (postId, userToken) => {
  return await request(`post/${postId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

// 게시글 신고
export const reportPost = async (postId, userToken) => {
  return await request(`post/${postId}/report`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};