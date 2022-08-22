import { GET_USERS } from "../actions/users.actions";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
}
