import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST"

export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        const array = res.data.slice(0, num)
        dispatch({ type: GET_POSTS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const likePost = (postid, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like/` + postid,
      data: { userId: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postid, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikePost = (postid, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike/` + postid,
      data: { userId: userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postid, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postid, message) => {
  return (dispatch) => {
    return axios ({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/` + postid,
      data: {message}
    })
    .then((res) => {
      dispatch({ type: UPDATE_POST, payload: { message, postid } });
    })
    .catch((err) => console.log(err));
  }
}
