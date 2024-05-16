import { request } from './request';

// 특정 게시물 정보 가져오기
export const getSinglePost = async (postId, userToken) => {
  return await request(`/api/post/${postId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${userToken}` },
  });
};

// 게시물 수정
export const editPost = async (postId, userToken, title, contents, username) => {
  return await request(`/api/post/${postId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({ title, contents, username }),
  });
};

// 게시물 삭제
export const deletePost = async (postId, userToken) => {
  return await request(`/api/post/${postId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};