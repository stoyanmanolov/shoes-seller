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
router.get("/shoes/:id", shoesController.getShoe);
router.patch("/shoes/:id", adminAuth, shoesController.editShoe);
router.delete("/shoes/:id", adminAuth, shoesController.deleteShoe);
router.get("/shoes", shoesController.searchShoes);
router.get("/shoes/filters/fields", shoesController.getShoeFields);
router.get("/shoes/filtered/all", shoesController.getFilteredShoes);

module.exports = router;
