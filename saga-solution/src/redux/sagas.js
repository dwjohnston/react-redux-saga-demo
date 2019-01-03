import * as Actions from "./actions";
import { put, takeEvery, all, call } from 'redux-saga/effects'
import { makeApiCall } from "../api";
import { fetchUsers, fetchPostsForUser, fetchTodosForUser } from "../api";
import { hasSpecialPosts } from "../util/isSpecial";

export function* selectUserSaga(action) {
    const id = action.payload.id;

    yield put(Actions.fetchPostsForUserRequest(id));
}

export function* watchSelectUser(action) {
    yield takeEvery(Actions.SELECT_USER, selectUserSaga);
}

export function* fetchPostsForUserSaga(action) {
    const userId = action.payload.id;

    try {
        //We could do: 
        //const posts = yield fetchPostsForUser(userId);
        const posts = yield call(fetchPostsForUser, userId);
        console.log(posts);
        yield put({
            type: Actions.FETCH_POSTS_FOR_USER_SUCCESS,
            payload: {
                posts,
                userId: userId
            }
        });

        const hasSpecial = yield call(hasSpecialPosts, posts);
        if (hasSpecial) {
            yield put(Actions.fetchTodosForUserRequest(userId));
        }
    }

    catch (err) {
        yield put(Actions.fatalError(err));
    }
}

export function* watchFetchPostsForUser(id) {
    yield takeEvery(Actions.FETCH_POSTS_FOR_USER_REQUEST, fetchPostsForUserSaga);

}

export function* fetchTodosForUserSaga(action) {
    const id = action.payload.id;

    try {
        const todos = yield call(fetchTodosForUser, id);
        yield put({
            type: Actions.FETCH_TODOS_FOR_USER_SUCCESS,
            payload: {
                todos,
                userId: id
            }
        });
    }

    catch (err) {
        yield put(Actions.fatalError(err));
    }
}

export function* watchFetchTodosForUser() {
    yield takeEvery(Actions.FETCH_TODOS_FOR_USER_REQUEST, fetchTodosForUserSaga);
}

export function* fetchUsersSaga(action) {

    const id = action.payload.id;

    try {
        const users = yield call(fetchUsers, id);
        yield put({
            type: Actions.FETCH_USERS_SUCCESS,
            payload: {
                users,
                userId: id
            }
        });
    }

    catch (err) {
        yield put(Actions.fatalError(err));
    }
};

export function* watchFetchUsers() {
    yield takeEvery(Actions.FETCH_USERS_REQUEST, fetchUsersSaga);
}


export default function* rootSaga() {
    yield all([
        watchFetchPostsForUser(),
        watchFetchTodosForUser(),
        watchFetchUsers(),
        watchSelectUser(),
    ])
}