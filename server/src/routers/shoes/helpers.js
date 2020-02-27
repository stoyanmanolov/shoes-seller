const findUniqueResults = (shoeData, field, results) => {
  let notIncluded = !results.find(result => result[field] === shoeData);
  let alreadyIncluded = results.find(result => result[field] === shoeData);

  if (notIncluded) {
    results.push({ [field]: shoeData, count: 1 });
  } else if (alreadyIncluded) {
    let index = results.findIndex(result => result[field] === shoeData);
    results[index].count++;
  }
};

const findFieldResults = (shoes, field) => {
  let results = [];

  shoes.forEach(shoe => {
    let shoeData = shoe[field];
    if (field === "sizes" || field === "colors") {
      shoeData.map(size => {
        findUniqueResults(size, field, results);
      });
    } else if (field === "model") {
      shoeData = shoe["brand"] + " " + shoeData;
      findUniqueResults(shoeData, field, results);
    } else findUniqueResults(shoeData, field, results);
  });

  return results;
};

const getGender = gender => {
  if (gender === "Male" || gender === "Female") {
    return { $in: [gender, "Both"] };
  } else if (gender === "All") {
    return { $in: ["Male", "Female", "Both"] };
  }
};

module.exports = { findFieldResults, getGender };
