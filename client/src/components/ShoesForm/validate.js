import validator from "validator";

export const validateForm = data => {
  let errors = {};
  Object.keys(data).forEach(key => {
    const value = data[key];

    if (!value && key !== "images") {
      if (key === "frontImage") {
        errors["images"] = "Please fill in the field!";
      } else errors[key] = "Please fill in the field!";
    } else if (key === "price") {
      if (!validator.isCurrency(value)) {
        errors[key] = "Please enter a currency!";
      }
    } else if (key === "sizes") {
      if (value[0] === "") {
        errors[key] = "Please fill in the field!";
      } else {
        let duplicate = [];

        value.forEach(size => {
          if (size.length !== 2) {
            errors[key] = "Please use the correct format!";
          }
          if (!duplicate.includes(size)) {
            duplicate.push(size);
          } else if (duplicate.includes(size)) {
            errors[key] = "Please don't use duplicates!";
          }
        });
      }
    }
  });
  return errors;
};

export const validateImages = images => {
  const validatedImages = [];

  images.forEach(image => {
    const isEmpty = image.size === 0;
    const isDuplicate = validatedImages.find(
      validatedImage => validatedImage.name === image.name
    );
    if (!isEmpty) {
      if (!isDuplicate) validatedImages.push(image);
    }
  });

  return validatedImages;
};
