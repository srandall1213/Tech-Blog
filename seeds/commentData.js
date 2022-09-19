const { Comment } = require('../models');

const commentData = [
    {
        id: 1,
        commentText: "I just learned about this in my class!",
        userID: 3,
        postID: 2,
    },
    {
        id: 2,
        commentText: "I agree!",
        userID: 1,
        postID: 3,
    },
    {
        id: 3,
        commentText: "I learned about this in my coding boot camp!",
        userID: 2,
        postID: 1,
    },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;