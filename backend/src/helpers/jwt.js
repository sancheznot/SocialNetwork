// import dependecies
const jwt = require("jwt-simple");
const moment = require("moment");

// secret pass
const secret = "clavesecreta_2";

// Generate token funtion

const tokenGenerator = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(15, "days").unix(),
  };
  // return token encryption
  return jwt.encode(payload, secret);
};

module.exports = { secret, tokenGenerator };
