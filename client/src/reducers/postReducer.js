import { GET_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/post.action";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            userlikers: [action.payload.userId, ...post.userlikers],
          };
        }
        return post;
      });

    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            userlikers: post.userlikers.filter(
              (id) => id !== action.payload.userId
              ),
            }
          }
          return post;
          
      });
    default:
      return state;
  }
}
