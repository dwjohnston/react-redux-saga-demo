import * as Action from "./actions";
import { combineReducers } from "redux";

const users = (state = { users: [] }, action) => {

    switch (action.type) {
        case Action.FETCH_USERS_SUCCESS: {
            return action.payload;
        }

        default: return state;
    }
}

const posts = (state = {}, action) => {
    switch (action.type) {
        case Action.FETCH_POSTS_FOR_USER_SUCCESS: {
            return { ...state, [action.payload.userId]: action.payload.posts };
        }
        default: return state;
    }
}

const todos = (state = {}, action) => {
    switch (action.type) {
        case Action.FETCH_TODOS_FOR_USER_SUCCESS: {
            return { ...state, [action.payload.userId]: action.payload.todos };
        }
        default: return state;
    }
}

const selectedUser = (state = { id: null }, action) => {

    switch (action.type) {
        case Action.SELECT_USER: {
            return action.payload;
        }

        default: return state;
    }

}

const rootReducer = combineReducers({
    users,
    posts,
    todos,
    selectedUser
});


export default rootReducer; 