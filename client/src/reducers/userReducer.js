import { GET_USER, UPLOAD_PICTURE, UPDATE_PROFIL } from "../actions/user.action";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case UPDATE_PROFIL:
      return {
        ...state,
        pseudo: action.payload,
        password: action.payload,
      };
    default:
      return state;
  }
}
