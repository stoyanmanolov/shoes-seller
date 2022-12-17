const fs = require("fs");
const Shoe = require("../../models/Shoe");
const { findFieldResults, getGender, formatFilters } = require("./utils");

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

const getGenderSpecificShoes = async (req, res) => {
  try {
    let result = {};

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const forKids = req.query.forKids || false;

    let filters;
    req.query.filters
      ? (filters = formatFilters(JSON.parse(req.query.filters)))
      : (filters = {});

    if (req.query.numOfPages) {
      const count = await Shoe.countDocuments(
        req.params.gender
          ? { gender: getGender(req.params.gender), forKids, ...filters }
          : { forKids, ...filters }
      );
      if (limit) {
        result = { ...result, numOfPages: Math.ceil(count / limit) };
      } else return res.status(400).send("Please specify a limit attribute.");
    }
    await Shoe.find(
      req.params.gender
        ? { gender: getGender(req.params.gender), forKids, ...filters }
        : { forKids, ...filters }
    )
      .skip(skip)
      .limit(limit)
      .sort(req.query.sortOption ? JSON.parse(req.query.sortOption) : {})
      .exec((err, shoes) => {
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

// Search for the unique values of a field of the Shoe model and how many times it was met.
// Example: GET/shoes/fields/men/category => Output: [{ category: 'Sneakers', count: 12 }]
const getShoeField = async (req, res) => {
  try {
    await Shoe.find(
      {
        gender: getGender(req.params.gender),
        forKids: req.query.forKids,
      },
      (err, shoes) => {
        const { field } = req.params;
        const results = findFieldResults(shoes, field);
        results.sort((a, b) =>
          a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0
        );
        res.status(200).send(results);
      }
    );
  } catch (e) {
    res.status(400).send(e);
  }
};

const getShoePriceBoundries = async (req, res) => {
  try {
    let result = {};

    const minPriceShoe = await Shoe.find({
      gender: getGender(req.params.gender),
      forKids: req.query.forKids,
    })
      .sort({ price: 1 })
      .limit(1);
    result.minPrice = minPriceShoe[0].price;

    const maxPriceShoe = await Shoe.find({
      gender: getGender(req.params.gender),
      forKids: req.query.forKids,
    })
      .sort({ price: -1 })
      .limit(1);
    result.maxPrice = maxPriceShoe[0].price;

    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getShoeById = async (req, res) => {
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

const editShoeById = async (req, res) => {
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

const deleteShoeById = async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedShoe = await Shoe.findOneAndDelete({ _id });
    if (!deletedShoe) return res.sendStatus(404);

    fs.unlink("src/images/" + deletedShoe.frontImage, (err) => {});
    deletedShoe.images.forEach((image) => {
      fs.unlink("src/images/" + image, (err) => {});
    });

    res
      .status(200)
      .send({ message: `Shoe with id: ${_id} deleted successfuly.` });
  } catch (e) {
    res.sendStatus(400);
  }
};

module.exports = {
  addShoe,
  getGenderSpecificShoes,
  getShoeField,
  getShoePriceBoundries,
  getShoeById,
  searchShoes,
  editShoeById,
  deleteShoeById,
};
