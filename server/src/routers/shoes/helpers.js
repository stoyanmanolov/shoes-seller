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
    } else findUniqueResults(shoeData, field, results);
  });

  return results;
};

module.exports = { findFieldResults };
