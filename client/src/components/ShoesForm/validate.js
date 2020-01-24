import validator from "validator";

const validate = data => {
  let errors = {};
  Object.keys(data).forEach(key => {
    const value = data[key];
    if (!value) {
      errors[key] = "Please fill in the field!";
    } else if (key === "price") {
      if (!validator.isCurrency(value)) {
        errors[key] = "Please enter a currency!";
      }
    } else if (key === "sizes") {
      let duplicate = [];
      value.forEach(size => {
        if (size.length !== 2) {
          errors[key] = "Please use the correct format!";
          return;
        } else if (!duplicate.includes(size)) {
          duplicate.push(size);
        } else if (duplicate.includes(size)) {
          errors[key] = "Please don't use duplicate sizes";
        }
      });
    }
  });
  return errors;
};

export default validate;
