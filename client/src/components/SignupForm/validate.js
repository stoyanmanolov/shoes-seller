import validator from "validator";

const validate = fields => {
  let errors = {};
  Object.keys(fields).forEach(key => {
    const value = fields[key];
    if (value.length === 0) {
      errors[key] = `Please fill in the ${key} field!`;
    } else {
      if (key === "email") {
        if (!validator.isEmail(value)) {
          errors[key] = "Please enter a correct email address!";
        }
      } else if (key === "password") {
        if (value.length < 6) {
          errors[key] = "Please enter a password with 6 or more characters!";
        }
      }
    }
  });
  return errors;
};

export default validate;
