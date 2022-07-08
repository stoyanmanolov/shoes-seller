export const validateForm = (data) => {
  let errors = {};
  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (!value && key !== "images") {
      if (key === "frontImage") {
        errors["images"] = "Please fill in the field!";
      } else errors[key] = "Please fill in the field!";
    } else if (key === "price") {
      if (value.split(".")[1] && value.split(".")[1].length > 2) {
        errors[key] = "Please use the correct format!";
      }
    } else if (key === "sizes" || key === "amounts") {
      let nonDuplicates = [];

      value.forEach((item) => {
        if (!item) {
          errors["amountPerSize"] = "Please fill in the fields!";
        } else if (key === "sizes") {
          if (item.toString().length !== 2)
            errors["amountPerSize"] =
              "Only double digit numbers allowed for sizes!";
          else if (!nonDuplicates.includes(item)) {
            nonDuplicates.push(item);
          } else if (nonDuplicates.includes(item)) {
            errors["amountPerSize"] = "Please don't use duplicates!";
          }
        }
      });
    }
  });
  return errors;
};

export const validateImages = (images) => {
  const validatedImages = [];

  images.forEach((image) => {
    const isEmpty = image.size === 0;
    const isDuplicate = validatedImages.find(
      (validatedImage) => validatedImage.name === image.name
    );
    if (!isEmpty) {
      if (!isDuplicate) validatedImages.push(image);
    }
  });

  return validatedImages;
};

export const formatForSubmission = (validatedData) => {
  const formData = new FormData();
  Object.keys(validatedData).forEach((key) => {
    if (key === "amounts") {
      return;
    } else if (key === "images") {
      validatedData[key].forEach((image, index) => {
        formData.append("images" + index, image);
      });
    } else if (key === "amountPerSize") {
      formData.append(key, JSON.stringify(validatedData[key]));
    } else formData.append(key, validatedData[key]);
  });
  return formData;
};
