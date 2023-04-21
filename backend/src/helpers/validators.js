const validate = require("validator");

const validateValue = (params) => {
  const { name, username, email, password } = params;

  let names =
    !validate.isEmpty(name) &&
    validate.isLength(name, { min: 2, max: 60 }) &&
    validate.isAlpha(name, "en-US");

  let usernames =
    !validate.isEmpty(username) &&
    validate.isLength(username, { min: 2, max: 60 });

  let emails =
    !validate.isEmpty(email) &&
    validate.isLength(email, { min: 2, max: 60 }) &&
    validate.isEmail(email);

  let passwords = !validate.isEmpty(password);
  const Errors = ["hola", "gad"];
  if (!names || !usernames || !emails || !passwords) {
    throw new Error(Errors);
  } else {
    console.log("validation success");
  }
};

module.exports = validateValue;
