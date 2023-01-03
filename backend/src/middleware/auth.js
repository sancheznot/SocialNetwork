// import module
const jwt = require("jwt-simple");
const moment = require("moment");
const { secret } = require("../helpers/jwt");

// auth function
const auth = (req, res, next) => {
  // check authorization header
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({
      status: "Error",
      message: "Header Authorization required",
    });
  }
  // clean token
  const token = authorization.replace(/['"]+/g, "");
  // decrypted token

  try {
    let payload = jwt.decode(token, secret);
    if (payload.exp <= moment().unix()) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "Token expired",
      }); 
    }
    // add user data
    req.user = payload;

    // check token exp  
  } catch (error) {
    return res.status(404).json({
      status: "Error",
      message: "Invalid token",
    });
  }
  // exec next
  next();
};

module.exports = {
  auth,
};
