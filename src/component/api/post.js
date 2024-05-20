import axios from 'axios';

const baseUrl = 'http://3.38.225.120:8080';

export const getSinglePost = async (postId, userToken) => {
  const response = await axios.get(`${baseUrl}/api/post/${postId}`, {
    headers: { Authorization: userToken },
  });
  return response.data;
};

export const editPost = async (postId, userToken, title, contents, username) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/post/${postId}`,
      { title, contents, username },
      {
        headers: {
          Authorization: userToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API call error:', error.response.data);
      throw new Error(`API call failed with status ${error.response.status}: ${error.response.data}`);
    } else {
      console.error('Network or other error:', error.message);
      throw new Error('Network or other error: ' + error.message);
    }
  }
};

export const deletePost = async (postId, userToken) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/post/${postId}`, {
      headers: {
        Authorization: userToken,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API call error:', error.response.data);
      throw new Error(`API call failed with status ${error.response.status}: ${error.response.data}`);
    } else {
      console.error('Network or other error:', error.message);
      throw new Error('Network or other error: ' + error.message);
    }
  }
};
