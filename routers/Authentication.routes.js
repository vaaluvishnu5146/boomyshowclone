const express = require("express");
const {
  createUser,
  signInUser,
} = require("../controllers/Authentication.controller");

// CREATE A AUTH_ROUTE
const AuthenticationRoute = express.Router();

// CREATE A ROUTE TO SIGNUP USER

/**
 * METHOD = POST
 * INPUT = {
 *    email,
 *    userName,
 *    phoneNumber,
 *    password
 * }
 * PATH = http://domain/api/auth/signup
 */
AuthenticationRoute.post("/signup", createUser);

// CREATE A ROUTE TO SIGNIN USER
AuthenticationRoute.post("/signin", signInUser);
// CREATE A ROUTE TO UPDATE USER
// CREATE A ROUTE TO DELETE USER

module.exports = AuthenticationRoute;
