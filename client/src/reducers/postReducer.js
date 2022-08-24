import { GET_POSTS, LIKE_POST, UNLIKE_POST, UPDATE_POST } from "../actions/post.action";

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
        else return post; 
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
          else return post; 
      });
      case UPDATE_POST:
        return state.map((post) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              message: action.payload.message,
            }
          }
          else return post; 
        })
    default:
      return state;
  }
}
