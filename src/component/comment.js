import { request } from './request';

// 댓글 삭제
export const deleteComment = async (postId, commentId, userToken) => {
  return await request(`post/${postId}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

// 댓글 신고
export const reportComment = async (postId, commentId, userToken) => {
  return await request(`post/${postId}/comments/${commentId}/report`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      report: {
        comment: commentId,
      },
    }),
  });
};