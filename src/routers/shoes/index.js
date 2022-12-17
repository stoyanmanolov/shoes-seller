const express = require("express");
const multer = require("multer");
const { adminAuth } = require("../../middleware/auth");
const shoesController = require("../../controllers/shoes");

const router = new express.Router();

var path = require("path");

var storage = multer.diskStorage({
  destination: "src/images",
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

router.post("/shoes", adminAuth, upload.any(), shoesController.addShoe);
router.get("/shoes/all/:gender", shoesController.getGenderSpecificShoes);
router.get("/shoes/fields/:gender/:field", shoesController.getShoeField);
router.get(
  "/shoes/fields/:gender/price/boundries",
  shoesController.getShoePriceBoundries
);
router.get("/shoes/shoe/:id", shoesController.getShoeById);
router.get("/shoes/search", shoesController.searchShoes);
router.patch("/shoes/shoe/:id", adminAuth, shoesController.editShoeById);
router.delete("/shoes/:id", adminAuth, shoesController.deleteShoeById);

module.exports = router;
