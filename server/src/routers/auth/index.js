const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const isAvailable = require("./helpers");

const router = new express.Router();

router.post("/register", async (req, res) => {
  try {
    let errors = [];
    let { email, username } = req.body;

    // Checking for email and username availability
    let available = await isAvailable({ email });
    if (!available) {
      errors.push("Email not available!");
    }

    available = await isAvailable({ username });
    if (!available) {
      errors.push("Username not available!");
    }

    // If not available throw the errors.
    if (errors.length !== 0) {
      throw errors;
    }

    // Register
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(409).send(error);
  }
});

module.exports = router;
