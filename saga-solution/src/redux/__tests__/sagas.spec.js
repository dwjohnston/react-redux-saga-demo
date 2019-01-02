import { fetchPostsForUserSaga } from "../sagas";
import * as Actions from "../actions";
import { put, takeEvery, all, call } from 'redux-saga/effects'
import { hasSpecialPosts } from "../../util/isSpecial";
import { fetchUsers, fetchPostsForUser, fetchTodosForUser } from "../../api";
import { bindActionCreators } from "redux";


describe("fetchPostForUserSaga", () => {

    beforeEach(() => {

    });

    describe("if API call is successful", () => {

        describe("and if post IS special", () => {


            it("calls the fetchPostsForUser api function ()", () => {
                let gen = fetchPostsForUserSaga({
                    type: "it doesn't matter",
                    payload: {
                        id: 1
                    }
                });

                const apiResponse = "foo";

                expect(gen.next().value).toEqual(call(fetchPostsForUser, 1));
                expect(gen.next(apiResponse).value).toEqual(put({
                    type: Actions.FETCH_POSTS_FOR_USER_SUCCESS,
                    payload: {
                        posts: apiResponse,
                        userId: 1,
                    }
                }));
                expect(gen.next().value).toEqual(call(hasSpecialPosts, apiResponse));
                expect(gen.next(true).value).toEqual(put(Actions.fetchTodosForUserRequest(1)));
                expect(gen.next().done).toEqual(true);


            });
        })

        describe("and if post is NOT special", () => {

            it("calls the fetchPostsForUser api function ()", () => {
                let gen = fetchPostsForUserSaga({
                    type: "it doesn't matter",
                    payload: {
                        id: 1
                    }
                });

                const apiResponse = "boo";

                expect(gen.next().value).toEqual(call(fetchPostsForUser, 1));
                expect(gen.next(apiResponse).value).toEqual(put({
                    type: Actions.FETCH_POSTS_FOR_USER_SUCCESS,
                    payload: {
                        posts: apiResponse,
                        userId: 1,
                    }
                }));
                expect(gen.next().value).toEqual(call(hasSpecialPosts, apiResponse));
                expect(gen.next(false).done).toEqual(true);

            });
        })

    })

    describe("if API call is not successful", () => {
        let gen = fetchPostsForUserSaga({
            type: "it doesn't matter",
            payload: {
                id: 1
            }
        });

        expect(gen.next().value).toEqual(call(fetchPostsForUser, 1));
        const apiResponse = new Error("An Error");
        expect(gen.throw(apiResponse).value).toEqual(put(Actions.fatalError(apiResponse)));
        expect(gen.next().done).toEqual(true);
    });

})
