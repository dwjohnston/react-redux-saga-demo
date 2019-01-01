export const postIsSpecial = (post) => {
    return post.title.startsWith('voluptate');
};

export const hasSpecialPosts = (posts) => {
    return posts.some(post => postIsSpecial(post));
}