// The module we are testing
import * as Actions from "../actions";

//These modules are dependencies we are going to mock
import * as special from "../../util/isSpecial";
import * as api from "../../api";



describe("fetchTodosForUserRequest", () => {

    let mockDispatch;
    beforeEach(() => {
        mockDispatch = jest.fn();
    })

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

    describe("if api call is successful", () => {
        //Mock a successful response
        const apiResponse = "whatever2";
        beforeEach(() => {
            api.fetchPostsForUser = jest.fn().mockResolvedValue(apiResponse);
        })


        it("if any of the posts are special, it also fetches todos", async () => {
            special.hasSpecialPosts = jest.fn().mockReturnValue(true);

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

            //This doesn't work because they're not strictly equal. 
            //expect(mockDispatch).toHaveBeenLastCalledWith(Actions.fetchTodosForUserRequest(6));
            expect(mockDispatch).toHaveBeenLastCalledWith(expect.any(Function));

        });


        it("if any of the posts are special, it also fetches todos", async () => {
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
            const action = _actions.fetchPostsForUserRequest(6);
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
            // expect(genFn()).toEqual(genFn()); //Fail
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