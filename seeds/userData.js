const { User } = require('../models');

const userData = [
    {
        email: "jane@email.com",
        username: "jane305",
        password: "password1"
    },
    {
        email: "john@email.com",
        username: "john202",
        password: "password2"
    },
    {
        email: "sam@email.com",
        username: "sam568",
        password: "password3"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;