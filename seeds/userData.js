const { User } = require('../models');

const userData = [
    {
        username: "jane",
        password: "password1"
    },
    {
        username: "john",
        password: "password2"
    },
    {
        username: "sam",
        password: "password3"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;