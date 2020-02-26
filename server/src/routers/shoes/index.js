const express = require("express");
const multer = require("multer");
const Shoe = require("../../models/Shoe");
const { adminAuth } = require("../../middleware/auth");
const { findFieldResults } = require("./helpers");

const router = new express.Router();

var path = require("path");

var storage = multer.diskStorage({
  destination: "src/images",
  filename: function(req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  }
});

var upload = multer({ storage: storage });

router.post("/shoes", adminAuth, upload.any(), async (req, res) => {
  try {
    req.body.sizes = req.body.sizes.split(",");
    req.body.sizes = req.body.sizes.map(size => parseInt(size));
    req.body.colors = req.body.colors.split(",");
    console.log(req.files);
    console.log(req.body);
    req.body.images = [];
    req.files.forEach(file => {
      if (file.fieldname === "frontImage") {
        req.body.frontImage = process.cwd() + "\\" + file.path;
      } else req.body.images.push(process.cwd() + "\\" + file.path);
    });
    const shoe = new Shoe(req.body);
    await shoe.save();
    res.status(201).send(shoe);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/shoes", async (req, res) => {
  try {
    await Shoe.find((err, shoes) => {
      res.status(200).send(shoes);
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Search for the unique values of a field of the Shoe model and how many times it was met.
// Example: GET/shoes/category => Output: [{ category: 'Sneakers', count: 12 }]
router.get("/shoes/:field", async (req, res) => {
  try {
    await Shoe.find((err, shoes) => {
      const { field } = req.params;
      const results = findFieldResults(shoes, field);
      results.sort((a, b) =>
        a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0
      );
      res.status(200).send(results);
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/shoes/price/boundries", async (req, res) => {
  try {
    let result = {};

    const minPriceShoe = await Shoe.find({})
      .sort({ price: 1 })
      .limit(1);
    result.minPrice = minPriceShoe[0].price;

    const maxPriceShoe = await Shoe.find({})
      .sort({ price: -1 })
      .limit(1);
    result.maxPrice = maxPriceShoe[0].price;

    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/shoes/shoe/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const shoe = await Shoe.findOne({ _id });

    if (!shoe) {
      res.sendStatus(404);
    } else {
      res.status(200).send(shoe);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/shoes/:id", adminAuth, async (req, res) => {
  try {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const shoe = await Shoe.findById({ _id });
    updates.forEach(update => {
      shoe[update] = req.body[update];
    });
    await shoe.save();
    res.status(200).send(shoe);
  } catch (e) {
    res.sendStatus(404);
  }
});

router.delete("/shoes/:id", adminAuth, async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedShoe = await Shoe.findOneAndDelete({ _id });
    if (!deletedShoe) return res.sendStatus(404);
    res
      .status(200)
      .send({ message: `Shoe with id: ${_id} deleted successfuly.` });
  } catch (e) {
    res.sendStatus(400);
  }
});

module.exports = router;
