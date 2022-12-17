const findUniqueResults = (shoeData, field, results) => {
  let notIncluded = !results.find((result) => result[field] === shoeData);
  let alreadyIncluded = results.find((result) => result[field] === shoeData);

  if (notIncluded) {
    results.push({ [field]: shoeData, count: 1 });
  } else if (alreadyIncluded) {
    let index = results.findIndex((result) => result[field] === shoeData);
    results[index].count++;
  }
};

const findFieldResults = (shoes, field) => {
  let results = [];

  shoes.forEach((shoe) => {
    let shoeData = shoe[field];
    if (field === "sizes" || field === "colors") {
      shoeData.map((size) => {
        findUniqueResults(size, field, results);
      });
    } else if (field === "model") {
      findUniqueResults(shoeData, field, results);
    } else findUniqueResults(shoeData, field, results);
  });

  return results;
};

const getGender = (gender) => {
  if (gender === "Male" || gender === "Female") {
    return { $in: [gender, "Both"] };
  } else if (gender === "All") {
    return { $in: ["Male", "Female", "Both"] };
  }
};

const formatFilters = (queryFilters) => {
  let filters = {};
  Object.keys(queryFilters).map((filterKey) => {
    if (queryFilters[filterKey].length !== 0) {
      if (filterKey === "sizes") {
        filters = {
          ...filters,
          [filterKey]: { $in: queryFilters[filterKey] },
        };
      } else if (filterKey === "price") {
        filters = {
          ...filters,
          [filterKey]: {
            $gt: queryFilters[filterKey][0] - 1,
            $lt: queryFilters[filterKey][1] + 1,
          },
        };
      } else filters = { ...filters, [filterKey]: queryFilters[filterKey] };
    }
  });
  return filters;
};

module.exports = { findFieldResults, getGender, formatFilters };
