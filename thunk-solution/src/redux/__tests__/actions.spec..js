// The module we are testing
import * as Actions from "../actions";

//These modules are dependencies we are going to mock
import * as special from "../../util/isSpecial";
import * as api from "../../api";



describe("fetchTodosForUserRequest", async () => {

    let mockDispatch;
    beforeEach(() => {
        mockDispatch = jest.fn();
    })

    it("if api call is successful, it dispatches a success action", async () => {
        //Mock a successful response
        const apiResponse = "whatever";
        api.apiFetchTodosForUser = jest.fn().mockResolvedValue(apiResponse);
        const mockedUserId = 2;
        //Create the action
        const action = Actions.fetchTodosForUserRequest(mockedUserId);

        //Redux thunk calls the function
        await action(mockDispatch);

        //Check that the api function was called
        expect(api.apiFetchTodosForUser).toBeCalledWith(mockedUserId);

        //Check that we dispatched the right action, with the right payload
        expect(mockDispatch).toBeCalledWith({
            type: Actions.FETCH_TODOS_FOR_USER_SUCCESS,
            payload: {
                todos: apiResponse,
                userId: mockedUserId
            }
        });
    });

    it("if api call a failure, it dispatches a failure action", async () => {
        //Mock a successful response
        api.apiFetchTodosForUser = jest.fn().mockRejectedValue(new Error('Async error'));

        //Create the action
        const action = Actions.fetchTodosForUserRequest(3);

        //Redux thunk calls the function
        await action(mockDispatch);

        //Check that the api function was called
        expect(api.apiFetchTodosForUser).toBeCalledWith(3);

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

    describe("if api call is successful", () => {
        //Mock a successful response
        const apiResponse = "whatever2";
        beforeEach(() => {
            api.apiFetchPostsForUser = jest.fn().mockResolvedValue(apiResponse);
        })


        it("take1: if any of the posts are special, it also fetches todos", async () => {
            special.hasSpecialPosts = jest.fn().mockReturnValue(true);

            const mockedUserId = 6;
            const action = Actions.fetchPostsForUserRequest(mockedUserId);
            //Redux thunk calls the function
            await action(mockDispatch);
            //Check that the api function was called
            expect(api.apiFetchPostsForUser).toBeCalledWith(mockedUserId);
            expect(mockDispatch).toBeCalledWith({
                type: Actions.FETCH_POSTS_FOR_USER_SUCCESS,
                payload: {
                    posts: apiResponse,
                    userId: mockedUserId
                }
            });

            //This doesn't work because they're not strictly equal. 
            expect(mockDispatch).toHaveBeenLastCalledWith(Actions.fetchTodosForUserRequest(mockedUserId)); //fails
            //expect(mockDispatch).toHaveBeenLastCalledWith(expect.any(Function));

        });


        it("take2: if any of the posts are special, it also fetches todos", async () => {
            special.hasSpecialPosts = jest.fn().mockReturnValue(true);

            //Mocking the action creator
            const mockedThunk = () => "mocked thunk";

            //Mock the whole module, but keep the functionality of our original function
            function mockFunctions() {
                const original = require.requireActual('../actions');
                return {
                    ...original, //Pass down all the exported objects
                    fetchTodosForUserRequest: mockedThunk
                }
            }

            //Import our newly mocked module
            jest.mock('../actions', () => mockFunctions());
            const _actions = require.requireMock('../actions');
            const mockUserId = 7;
            const action = _actions.fetchPostsForUserRequest(mockUserId);
            //Redux thunk calls the function
            await action(mockDispatch);
            //Check that the api function was called
            expect(api.apiFetchPostsForUser).toBeCalledWith(mockUserId);
            expect(mockDispatch).toBeCalledWith({
                type: Actions.FETCH_POSTS_FOR_USER_SUCCESS,
                payload: {
                    posts: apiResponse,
                    userId: mockUserId

                }
            });

            //Fails. The original funtion still calls the original dependant function
            expect(mockDispatch).toHaveBeenLastCalledWith("mocked thunk");

        });


        it("some function equality examples", () => {

            const eg1 = () => {
                console.log("hello");
            };

            const genFn = () => () => {
                console.log("world");
            }

            expect(eg1).toEqual(eg1);   //Pass
            expect(genFn()).toEqual(genFn()); //Fail
        });
    });

    it("if api call a failure, it dispatches a failure action", async () => {
        api.apiFetchPostsForUser = jest.fn().mockRejectedValue(new Error('Async2 error'));
        const action = Actions.fetchPostsForUserRequest(6);

        await action(mockDispatch);
        expect(api.apiFetchPostsForUser).toBeCalledWith(6);
        expect(mockDispatch).toBeCalledWith({
            type: Actions.FATAL_ERROR,
            payload: {
                message: 'Async2 error'
            }
        });
    });

}); 