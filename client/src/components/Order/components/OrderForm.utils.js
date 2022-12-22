import validator from "validator";

export const getValidationErrors = (data) => {
  let errors = {};

  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (value === "") {
      errors[key] = "Please fill in the field!";
    } else if (key === "email") {
      if (!validator.isEmail(value)) {
        errors[key] = "Please enter a valid email!";
      }
    } else if (key === "phoneNumber") {
      if (!validator.isMobilePhone(value)) {
        errors[key] = "Please enter a valid phone number!";
      }
    }
  });

  return errors;
};
