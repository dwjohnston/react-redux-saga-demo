import { fetchPostsForUserSaga } from "../sagas";
import * as Actions from "../actions";
import { put, call } from 'redux-saga/effects'
import { hasSpecialPosts } from "../../util/isSpecial";
import { apiFetchPostsForUser, } from "../../api";


describe("fetchPostForUserSaga", () => {

    describe("if API call is successful", () => {

        describe("and there IS a special post", () => {

            it("calls the fetchPostsForUser api function, and dispatches a fetchTodos request ()", () => {
                const gen = fetchPostsForUserSaga({
                    type: "it doesn't matter",
                    payload: {
                        id: 1
                    }
                });

                const apiResponse = "foo";
                expect(gen.next().value).toEqual(call(apiFetchPostsForUser, 1));
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

        describe("and if there is NOT a special post", () => {

            it("calls the fetchPostsForUser api function ()", () => {
                let gen = fetchPostsForUserSaga({
                    type: "it doesn't matter",
                    payload: {
                        id: 2
                    }
                });

                const apiResponse = "boo";

                expect(gen.next().value).toEqual(call(apiFetchPostsForUser, 2));
                expect(gen.next(apiResponse).value).toEqual(put({
                    type: Actions.FETCH_POSTS_FOR_USER_SUCCESS,
                    payload: {
                        posts: apiResponse,
                        userId: 2,
                    }
                }));
                expect(gen.next().value).toEqual(call(hasSpecialPosts, apiResponse));
                expect(gen.next(false).done).toEqual(true);

            });
        })

    })

    describe("if API call is not successful", () => {

        it("dispatches a fatal error action", () => {
            let gen = fetchPostsForUserSaga({
                type: "it doesn't matter",
                payload: {
                    id: 3
                }
            });

            expect(gen.next().value).toEqual(call(apiFetchPostsForUser, 3));
            const apiResponse = new Error("An Error");
            expect(gen.throw(apiResponse).value).toEqual(put(Actions.fatalErrorRequest(apiResponse)));
            expect(gen.next().done).toEqual(true);
        });
    })
})
