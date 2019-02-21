import { apiFetchUsers, apiFetchPostsForUser, apiFetchTodosForUser } from "../api";
import { hasSpecialPosts } from "../util/isSpecial";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_POSTS_FOR_USER_REQUEST = "FETCH_POSTS_FOR_USER_REQUEST";
export const FETCH_TODOS_FOR_USER_REQUEST = "FETCH_TODOS_FOR_USER_REQUEST";

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_POSTS_FOR_USER_SUCCESS = 'FETCH_POSTS_FOR_USER_SUCCESS';
export const FETCH_TODOS_FOR_USER_SUCCESS = "FETCH_TODOS_FOR_USER_SUCCESS";

export const FATAL_ERROR_REQUEST = "FATAL_ERROR_REQUEST";
export const FATAL_ERROR_SUCCESS = "FATAL_ERROR_SUCCESS";

export const SELECT_USER_REQUEST = "SELECT_USER_REQUEST";
export const SELECT_USER_SUCCESS = "SELECT_USER_SUCCESS";

export const fatalErrorRequest = err => ({
    type: FATAL_ERROR_REQUEST,
    payload: {
        message: err.message
    }
});


export const selectUserRequest = id => ({
    type: SELECT_USER_REQUEST,
    payload: {
        id
    }
})

export const fetchUsersRequest = id => ({

    type: FETCH_USERS_REQUEST,
    payload: {
        id
    }

});

export const fetchPostsForUserRequest = id => ({

    type: FETCH_POSTS_FOR_USER_REQUEST,
    payload: {
        id
    }

});

export const fetchTodosForUserRequest = id => ({

    type: FETCH_TODOS_FOR_USER_REQUEST,
    payload: {
        id
    }

});


