const bcrypt = require("bcryptjs");

const users = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "shantanu",
    email: "shantanu123@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "user",
    email: "user@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
