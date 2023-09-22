const AuthModel = require("../models/Auth.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { sendMail } = require("../plugins/EmailEngine");

const saltRounds = 10;

async function createUser(req, res, next) {
  const user = req.body;

  // 1. CHECK USER ALREADY HAVE AN ACCOUNT
  //    1. ACCOUNT EXISTS SEND ERROR WITH SIGNIN MESSAGE
  //    2. IF ACCOUNT DOES NOT EXISTS START SIGNUP PROCESS
  // 2. ENCRYPT THE PASSWORD
  // 3. SAVE THE USER IN THE DATABASE
  //    1. SEND SUCCESS RESPONSE TO THE USER
  //    2. SEND ERROR IF PROBLEM OCCURS

  const matchedUser = await AuthModel.findOne({ email: user.email });

  if (matchedUser) {
    return res.status(401).json({
      success: false,
      message: "User Already exists. Try SignIn instead",
    });
  } else {
    // ENCRYPT THE PASSWORD
    try {
      const hash = await bcrypt.hash(user.password, saltRounds);
      if (hash) {
        // Store hash in your password DB.
        user.password = hash;
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Provided Password is not valid",
        error: err,
      });
    }

    // CREATE THE USER
    AuthModel.create(user)
      .then((response) => {
        if (response._id) {
          // sendMail(
          //   process.env.APP_REGISTERED_EMAIL,
          //   req.body.email,
          //   "Regarding Signup Activity in your BookMyShow account",
          //   "Signup Successfull",
          //   `<html><head></head><body>
          //     <h1>You Signup is successful</h1>
          //     <p>You account ${req.body.email} is created</p>
          //   </body></html>`
          // )
          //   .then((response) => {
          //     console.log(response);
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
          return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: response,
          });
        }
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          message: "Something went wrong",
          error: error.message,
        });
      });
  }
}

async function signInUser(req, res, next) {
  const user = req.body;
  if (!user.email || !user.password) {
    return res.status(401).json({
      success: false,
      error: "Invalid credentials",
      message: "Email or Password is wrong",
    });
  } else {
    // 1. Check whether email is in the database
    //     a. If not available send error response
    //     b. If available check password
    //        A. If password is not matching send error response
    //        B. If matching Generate JWT Token and send success response with token
    const matchedUser = await AuthModel.findOne({ email: user.email });
    if (!matchedUser) {
      return res.status(401).json({
        success: false,
        message: "No User exists. Try with right credentials",
      });
    }
    // 2. Compare and validate the password
    const match = await bcrypt.compare(user.password, matchedUser.password);
    if (match) {
      var token = jwt.sign(
        { roles: matchedUser.roles },
        process.env.NODE_JWT_TOKEN_KEY,
        { expiresIn: 60 }
      );
      // sendMail(
      //   "",
      //   req.body.email,
      //   "Regarding Login Activity in your BookMyShow account",
      //   "Login Successfull",
      //   "<html><head></head><body><h1>You login is successful</h1></body></html>"
      // )
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      return res.status(200).json({
        success: true,
        message: "Login successful!",
        refreshToken: token,
      });
    } else {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
        message: "Email or Password is wrong. Try again with right credentials",
      });
    }
  }
}

module.exports = {
  createUser,
  signInUser,
};
