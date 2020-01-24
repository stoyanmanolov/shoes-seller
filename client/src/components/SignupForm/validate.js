import validator from "validator";

const validate = data => {
  const { email, password } = data;
  let errors = {};
  if (!validator.isEmail(email)) {
    errors["email"] = "Please enter a correct email address!";
  }
  if (password.length < 8) {
    errors["password"] = "Please enter a password with 8 or more characters!";
  }
  return errors;
};

export default validate;
