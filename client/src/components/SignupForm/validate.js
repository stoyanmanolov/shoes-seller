import validator from "validator";

const validate = data => {
  const { email, password } = data;
  let errors = {};
  if (!validator.isEmail(email)) {
    errors["email"] = "Please enter a correct email address!";
  }
  if (password.length < 6) {
    errors["password"] = "Please enter a password with 6 or more characters!";
  }
  return errors;
};

export default validate;
