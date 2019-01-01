// The module we are testing
import * as Actions from "../actions";

import * as special from "../../util/isSpecial";
//The api module is a dependency we are going to mock
import * as api from "../../api";



describe("fetchTodosForUserRequest", () => {

    let mockDispatch;
    beforeEach(() => {
        mockDispatch = jest.fn();
    })

    it("calls the async fetchTodosForUser function", () => {

        //Mock the api function 
        api.fetchTodosForUser = jest.fn();

        //Create the action (an async function)
        const action = Actions.fetchTodosForUserRequest(1);

        //The action is called by the redux-thunk middleware, we put our own mocked dispatch function in
        action(mockDispatch);

        //Make our assertions here - in this case - that the api function was called. 
        expect(api.fetchTodosForUser).toBeCalledWith(1);


    });

    it("if api call is successful, it dispatches a success action", async () => {
        //Mock a successful response
        const apiResponse = "whatever";
        api.fetchTodosForUser = jest.fn().mockResolvedValue(apiResponse);

        //Create the action
        const action = Actions.fetchTodosForUserRequest(2);

        //Redux thunk calls the function
        await action(mockDispatch);

        //Check that the api function was called
        expect(api.fetchTodosForUser).toBeCalledWith(2);

        //Check that we dispatched the right action, with the right payload
        expect(mockDispatch).toBeCalledWith({
            type: Actions.FETCH_TODOS_FOR_USER_SUCCESS,
            payload: {
                todos: apiResponse,
                userId: 2
            }
        });
    });

    it("if api call a failure, it dispatches a failure action", async () => {
        //Mock a successful response
        api.fetchTodosForUser = jest.fn().mockRejectedValue(new Error('Async error'));

        //Create the action
        const action = Actions.fetchTodosForUserRequest(3);

        //Redux thunk calls the function
        await action(mockDispatch);

        //Check that the api function was called
        expect(api.fetchTodosForUser).toBeCalledWith(3);

        //Check that we dispatched the right action, with the right payload
        expect(mockDispatch).toBeCalledWith({
            type: Actions.FATAL_ERROR,
            payload: {
                message: 'Async error'
            }
        });
    });

});

describe("fetchPostsForUserRequest", () => {

    let mockDispatch;
    beforeEach(() => {
        mockDispatch = jest.fn();
    })

    it("calls the async fetchPostsForUser function", () => {
        api.fetchPostsForUser = jest.fn();
        const action = Actions.fetchPostsForUserRequest(4);

        action(mockDispatch);
        expect(api.fetchPostsForUser).toBeCalledWith(4);
    });

    describe("if api call is successful", () => {
        //Mock a successful response
        const apiResponse = "whatever2";
        beforeEach(() => {
            api.fetchPostsForUser = jest.fn().mockResolvedValue(apiResponse);
        })



        it("it dispatches a successful posts action", async () => {
            special.hasSpecialPosts = jest.fn().mockReturnValue(false);
            const action = Actions.fetchPostsForUserRequest(5);

            //Redux thunk calls the function
            await action(mockDispatch);
            //Check that the api function was called
            expect(api.fetchPostsForUser).toBeCalledWith(5);
            //Check that we dispatched the right action, with the right payload
            expect(mockDispatch).toBeCalledWith({
                type: Actions.FETCH_POSTS_FOR_USER_SUCCESS,
                payload: {
                    posts: apiResponse,
                    userId: 5
                }
            });
        });

        it("if any of the posts are special, it also fetches todos", async () => {
            special.hasSpecialPosts = jest.fn().mockReturnValue(true);
            Actions.fetchTodosForUserRequest = jest.fn().mockResolvedValue("mock todos");
            const action = Actions.fetchPostsForUserRequest(6);
            //Redux thunk calls the function
            await action(mockDispatch);
            //Check that the api function was called
            expect(api.fetchPostsForUser).toBeCalledWith(6);
            expect(mockDispatch).toBeCalledWith({
                type: Actions.FETCH_POSTS_FOR_USER_SUCCESS,
                payload: {
                    posts: apiResponse,
                    userId: 6
                }
            });

            expect(Actions.fetchTodosForUserRequest).toBeCalledWith(6);

        });

        it("if none of the posts are special, it doesn't fetch the todos", async () => {

        });
    });

    it("if api call a failure, it dispatches a failure action", async () => {
        api.fetchPostsForUser = jest.fn().mockRejectedValue(new Error('Async2 error'));
        const action = Actions.fetchPostsForUserRequest(6);

        await action(mockDispatch);
        expect(api.fetchPostsForUser).toBeCalledWith(6);
        expect(mockDispatch).toBeCalledWith({
            type: Actions.FATAL_ERROR,
            payload: {
                message: 'Async2 error'
            }
        });
    });

}); 