const express = require("express");
const Shoe = require("../../models/Shoe");
const { adminAuth } = require("../../middleware/auth");

const router = new express.Router();

router.post("/shoes", adminAuth, async (req, res) => {
  try {
    const shoe = new Shoe(req.body);
    await shoe.save();
    res.status(201).send(shoe);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/shoes", async (req, res) => {
  try {
    await Shoe.find((err, docs) => {
      res.status(200).send(docs);
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/shoes/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const shoe = await Shoe.findOne({ _id });
    if (!shoe) {
      res.sendStatus(404);
    } else res.status(200).send(shoe);
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
  } catch (error) {
    res.sendStatus(404);
  }
});

router.delete("/shoes/:id", adminAuth, async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedShoe = await Shoe.findOneAndDelete({ _id });
    res
      .status(200)
      .send({ message: `Shoe with id: ${_id} deleted successfuly.` });
  } catch (e) {
    res.sendStatus(404);
  }
});
module.exports = router;
