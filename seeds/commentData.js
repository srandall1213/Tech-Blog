const { Comment } = require('../models');

const commentData = [
    {
        id: 1,
        content: "I just learned about this in my class!",
        user_id: 1,
        post_id: 2,
    },
    {
        id: 2,
        content: "I agree!",
        user_id: 2,
        post_id: 3,
    },
    {
        id: 3,
        content: "I learned about this in my coding boot camp!",
        user_id: 3,
        post_id: 1,
    },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;