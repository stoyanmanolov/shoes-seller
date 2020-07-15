export const validateForm = (data) => {
  let errors = {};
  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (!value && key !== "images") {
      if (key === "frontImage") {
        errors["images"] = "Please fill in the field!";
      } else errors[key] = "Please fill in the field!";
    } else if (key === "sizes" || key === "amounts") {
      let nonDuplicates = [];

      value.forEach((item) => {
        if (!item) {
          errors["amountPerSizes"] = "Please fill in the fields!";
        } else if (key === "sizes") {
          if (item.toString().length !== 2)
            errors["amountPerSizes"] =
              "Only double digit numbers allowed for sizes!";
          else if (!nonDuplicates.includes(item)) {
            nonDuplicates.push(item);
          } else if (nonDuplicates.includes(item)) {
            errors["amountPerSizes"] = "Please don't use duplicates!";
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
