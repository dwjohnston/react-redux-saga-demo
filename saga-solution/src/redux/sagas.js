import * as Actions from "./actions";
import { put, takeEvery, all, call } from 'redux-saga/effects'
import { fetchUsers, fetchPostsForUser, fetchTodosForUser } from "../api";
import { hasSpecialPosts } from "../util/isSpecial";

export function* selectUserSaga(action) {
    const id = action.payload.id;

    yield put({
        type: Actions.SELECT_USER_SUCCESS,
        payload: action.payload,
    });

    yield put(Actions.fetchPostsForUserRequest(id));
}

export function* fetchPostsForUserSaga(action) {
    const userId = action.payload.id;

    try {
        const posts = yield call(fetchPostsForUser, userId);

        //We could do: 
        //const posts = yield fetchPostsForUser(userId);
        //redux-saga handles yielded promises fine, 
        //But the advantage of using call is it makes testing easier.

        //call() just creates an object, it doesn't actually do anything.
        console.log(call(fetchPostsForUser, userId)); //demo

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
        yield put(Actions.fatalErrorRequest(err));
    }
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
        yield put(Actions.fatalErrorRequest(err));
    }
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
        yield put(Actions.fatalErrorRequest(err));
    }
};

export function* fatalErrorSaga(action) {
    yield put({
        type: Actions.FATAL_ERROR_SUCCESS,
        payload: action.payload,
    })
}

export function* watchSelectUser(action) {
    yield takeEvery(Actions.SELECT_USER_REQUEST, selectUserSaga);
}

export function* watchFetchTodosForUser() {
    yield takeEvery(Actions.FETCH_TODOS_FOR_USER_REQUEST, fetchTodosForUserSaga);
}

export function* watchFetchUsers() {
    yield takeEvery(Actions.FETCH_USERS_REQUEST, fetchUsersSaga);
}

export function* watchFetchPostsForUser(id) {
    yield takeEvery(Actions.FETCH_POSTS_FOR_USER_REQUEST, fetchPostsForUserSaga);
}

export function* watchFatalError(id) {
    yield takeEvery(Actions.FATAL_ERROR_REQUEST, fatalErrorSaga);
}

export default function* rootSaga() {
    yield all([
        watchFetchPostsForUser(),
        watchFetchTodosForUser(),
        watchFetchUsers(),
        watchSelectUser(),
        watchFatalError(),
    ])
}