var jwt = require("jsonwebtoken");

function Authentication(req, res, next) {
  console.log("Headers", req.headers.authorization);
  console.log("Authentication Hits");
  try {
    var decoded = jwt.verify(
      req.headers.authorization,
      process.env.NODE_JWT_TOKEN_KEY
    );
    next();
  } catch (err) {
    // err
    return res.status(401).json({
      success: false,
      err: err.message,
      message: "Token Invalid or Expired",
    });
  }
}

module.exports = Authentication;
