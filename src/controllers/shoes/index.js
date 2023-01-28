const fs = require("fs");
const Shoe = require("../../models/Shoe");
const { findFieldResults, getGender } = require("./utils");

const getShoe = async (req, res) => {
  try {
    const _id = req.params.id;

    const shoe = await Shoe.findById(_id);
    if (!shoe) {
      res.sendStatus(404);
    } else res.status(200).send(shoe);
  } catch (e) {
    res.status(400).send(e);
  }
};

const addShoe = async (req, res) => {
  //In case of an error - delete the uploaded images.
  let deleteIfError = [];
  try {
    req.body.sizes = req.body.sizes.split(",").map((size) => parseInt(size));
    req.body.amountPerSize = JSON.parse(req.body.amountPerSize);

    req.body.images = [];
    req.files.forEach((file) => {
      if (file.fieldname === "frontImage") {
        req.body.frontImage = file.filename;
      } else req.body.images.push(file.filename);
      deleteIfError.push(file.filename);
    });
    const shoe = new Shoe(req.body);
    await shoe.save();

    res.status(201).send(shoe);
  } catch (e) {
    if (deleteIfError.length > 0) {
      deleteIfError.forEach((image) => {
        fs.unlink("src/images/" + image, (err) => {});
      });
    }
    res.status(400).send(e);
  }
};

const editShoe = async (req, res) => {
  try {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const shoe = await Shoe.findById({ _id });
    updates.forEach((update) => {
      shoe[update] = req.body[update];
    });
    await shoe.save();
    res.status(200).send(shoe);
  } catch (e) {
    res.sendStatus(404);
  }
};

const deleteShoe = async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedShoe = await Shoe.findOneAndDelete({ _id });
    if (!deletedShoe) return res.sendStatus(404);

    fs.unlink("src/images/" + deletedShoe.frontImage, (err) => {});
    deletedShoe.images.forEach((image) => {
      fs.unlink("src/images/" + image, (err) => {});
    });

    res.status(200).send(deletedShoe);
  } catch (e) {
    res.sendStatus(400);
  }
};

const searchShoes = async (req, res) => {
  try {
    const searchName = req.query.searchName.toLowerCase();
    const shoes = await Shoe.find({});

    if (!shoes) {
      res.sendStatus(404);
    } else {
      let matchingShoes = [];
      shoes.forEach((shoe) => {
        const shoeName = (shoe.brand + " " + shoe.model).toLowerCase();
        let isMatching = true;

        for (let i = 0; i < searchName.length; i++) {
          if (shoeName[i] !== searchName[i]) {
            isMatching = false;
          }
        }

        if (isMatching) matchingShoes.push(shoe);
      });
      if (req.query.limit) {
        matchingShoes = matchingShoes.slice(0, req.query.limit);
      }
      res.status(200).send(matchingShoes);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

const getFilteredShoes = async (req, res) => {
  try {
    const { limit, skip, sortOption, ...rest } = req.query;
    const queryFilters = rest;
    let result = {};
    let filters = {};

    Object.keys(queryFilters).map((filterKey) => {
      const filterValue = queryFilters[filterKey];

      if (filterValue.length !== 0) {
        switch (filterKey) {
          case "gender": {
            filters = {
              ...filters,
              gender: getGender(filterValue),
            };
            break;
          }
          case "sizes": {
            filters = {
              ...filters,
              sizes: { $in: filterValue },
            };
            break;
          }
          case "price": {
            const [lowestPrice, highestPrice] =
              queryFilters["price"].split(",");
            filters = {
              ...filters,
              price: {
                $gt: parseInt(lowestPrice) - 1,
                $lt: parseInt(highestPrice) + 1,
              },
            };
            break;
          }
          default: {
            filters = { ...filters, [filterKey]: filterValue };
          }
        }
      }
    });

    const query = Shoe.find(filters);

    if (skip) {
      query.skip(parseInt(skip));
    }

    if (limit) {
      query.limit(parseInt(limit));

      const count = await Shoe.countDocuments(filters);
      result = { ...result, numOfPages: Math.ceil(count / parseInt(limit)) };
    }

    if (sortOption) {
      query.sort(JSON.parse(sortOption));
    }

    await query.exec((err, shoes) => {
      if (err) throw err;
      if (shoes.length === 0) {
        return res
          .status(404)
          .send("No shoes matching your criteria were found.");
      }
      result = { ...result, shoes };
      res.status(200).send(result);
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

const getShoeFields = async (req, res) => {
  try {
    const shoes = await Shoe.find({
      gender: getGender(req.query.gender),
      forKids: req.query.forKids,
    }).sort({ price: 1 });

    let results = {};

    req.query.fields.split(",").forEach((field) => {
      if (field === "price") {
        results[field] = {
          minPrice: shoes[0].price,
          maxPrice: shoes[shoes.length - 1].price,
        };
      } else {
        results[field] = findFieldResults(shoes, field).sort((a, b) =>
          a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0
        );
      }
    });
    res.status(200).send(results);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  getShoe,
  addShoe,
  editShoe,
  deleteShoe,
  searchShoes,
  getShoeFields,
  getFilteredShoes,
};
