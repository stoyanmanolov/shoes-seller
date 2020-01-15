const findFieldResults = (shoes, field) => {
  let results = [];

  shoes.forEach(shoe => {
    let notIncluded = !results.find(result => result[field] === shoe[field]);
    let alreadyIncluded = results.find(result => result[field] === shoe[field]);
    if (notIncluded) {
      results.push({ [field]: shoe[field], count: 1 });
    } else if (alreadyIncluded) {
      let index = results.findIndex(result => result[field] === shoe[field]);
      results[index].count++;
    }
  });
  return results;
};

module.exports = { findFieldResults };
