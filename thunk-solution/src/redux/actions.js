import { fetchUsers, fetchPostsForUser, fetchTodosForUser } from "../api";

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_POSTS_FOR_USER_SUCCESS = 'FETCH_POSTS_FOR_USER_SUCCESS';
export const FETCH_TODOS_FOR_USER_SUCCESS = "FETCH_TODOS_FOR_USER_SUCCESS";

export const SELECT_USER = "SELECT_USER";

export const fetchUsersRequest = () => async (dispatch) => {

    try {
        const users = await fetchUsers();
        dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: {
                users
            }
        });
    }
    catch (err) {
        //FETCH_USERS_FAILURE
    }
}

export const fetchTodosForUserRequest = userId => async dispatch => {

    try {
        const todos = await fetchTodosForUser(userId);
        dispatch({
            type: FETCH_TODOS_FOR_USER_SUCCESS,
            payload: {
                todos,
                userId,
            }
        });
    }
    catch (err) {

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

export const postIsSpecial = (post) => {
    return post.title.startsWith('voluptate');
};

const hasSpecialPosts = (posts) => {
    return posts.some(post => postIsSpecial(post));
}

export const fetchPostsForUserRequest = (userId) => async (dispatch) => {

    try {
        const posts = await fetchPostsForUser(userId);
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

    }

}; 