//get user data
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = { id: userID, name: 'User' + userId };
            callback(user);
        }, 1000);
    });
}

//get user posts
function fetchUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const posts = ['Post 1', 'Post 2', 'Post 3'];
            callback(posts);
        }, 1000);
    });
}

//get comments
function fetchPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const comments = ['Comment 1', 'Comment 2'];
            callback(comments);
        }, 1000);
    });
}

//example with promise chain and error handling

fetchUserData(1)
    .then(user => {
        console.log('User: ', user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log('Posts: ', posts);
        return fetchPostComments(posts[0]);
    })
    .then(comments => {
        console.log('Comments: ', comments);
    })
    .catch(error => {
        console.error('Error: ', error);
    });