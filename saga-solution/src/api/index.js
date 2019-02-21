import axios from "axios";

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const URI_USERS = '/users';
const URI_POSTS = "/posts";
const URI_TODOS = "/todos"

export const makeApiCall = async function (uri) {
    try {
        const response = await axios(BASE_URL + uri);
        return response.data;
    } catch (err) {
        //We will handle this in the middleware
        throw err;
    }
}

export const apiFetchUsers = async function () {
    return makeApiCall(URI_USERS);
}

export const apiFetchPostsForUser = async function (id) {
    return makeApiCall(`${URI_POSTS}?userId=${id}`);
}

export const apiFetchTodosForUser = async function (id) {
    return makeApiCall(`${URI_TODOS}?userId=${id}`);
}



/**Not using - delete */
export const fetchPostsForUserFiltered = async function (id) {
    const posts = await apiFetchPostsForUser(id);
    return filterPosts(posts);
}

const vowels = ['A', 'E', 'I', 'O', 'U'];
export const filterPosts = function (posts) {
    return posts.filter(post => {
        vowels.includes(post[0].toUpperCase());
    })
}

