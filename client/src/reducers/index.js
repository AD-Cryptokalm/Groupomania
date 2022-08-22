import { combineReducers } from "redux";
import userReducer from "./userReducer";
import usersReducer from "./userReducer";
import postReducer from "./postReducer";


export default combineReducers({
    userReducer,
    usersReducer,
    postReducer
})