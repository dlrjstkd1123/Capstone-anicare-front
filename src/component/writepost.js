import { request } from './request';

// 게시물 생성
export const writePost = async (userToken, content, image) => {
  const formData = new FormData();
  formData.append('content', content);
  if (image) {
    formData.append('image', image);
  }

  return await request('post', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: formData,
  });
};
