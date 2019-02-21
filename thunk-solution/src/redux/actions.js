import { apiFetchUsers, apiFetchPostsForUser, apiFetchTodosForUser } from "../api";
import { hasSpecialPosts } from "../util/isSpecial";

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_POSTS_FOR_USER_SUCCESS = 'FETCH_POSTS_FOR_USER_SUCCESS';
export const FETCH_TODOS_FOR_USER_SUCCESS = "FETCH_TODOS_FOR_USER_SUCCESS";

export const FATAL_ERROR = "FATAL_ERROR";

export const SELECT_USER = "SELECT_USER";

export const fatalError = err => ({
    type: FATAL_ERROR,
    payload: {
        message: err.message
    }
});

export const fetchUsersRequest = () => async (dispatch) => {

    try {
        const users = await apiFetchUsers();
        dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: {
                users
            }
        });
    }
    catch (err) {
        dispatch(fatalError(err));
    }
}

export const fetchTodosForUserRequest = userId => async dispatch => {
    try {
        const todos = await apiFetchTodosForUser(userId);

        dispatch({
            type: FETCH_TODOS_FOR_USER_SUCCESS,
            payload: {
                todos,
                userId,
            }
        });
    }
    catch (err) {
        dispatch(fatalError(err));
    }
}


export const selectUser = id => async dispatch => {

    dispatch({
        type: SELECT_USER,
        payload: {
            id
        }
    });

    dispatch(fetchPostsForUserRequest(id));
}



export const fetchPostsForUserRequest = (userId) => async (dispatch) => {

    try {
        const posts = await apiFetchPostsForUser(userId);
        dispatch({
            type: FETCH_POSTS_FOR_USER_SUCCESS,
            payload: {
                posts,
                userId
            }
        });

        if (hasSpecialPosts(posts)) {
            dispatch(fetchTodosForUserRequest(userId));
        }

    }
    catch (err) {
        dispatch(fatalError(err));
    }

}; 