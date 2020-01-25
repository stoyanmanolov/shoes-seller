const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const isAvailable = require("./helpers");

const router = new express.Router();

router.post("/register", async (req, res) => {
  try {
    let errors = {};
    let { email, username, password } = req.body;

    // Checking for email and username availability
    let available = await isAvailable({ email });
    if (!available) {
      errors["email"] = "Email not available!";
    }

    available = await isAvailable({ username });
    if (!available) {
      errors["username"] = "Username not available!";
    }

    const notEmpty =
      Object.entries(errors).length !== 0 && errors.constructor === Object;
    // If not available throw the errors.
    if (notEmpty) {
      throw errors;
    }

    // Register.
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    password = hashedPass;
    const user = new User({ email, username, password });
    await user.save();

    // Respond.
    res.send({
      id: user.id,
      email: user.email,
      username: user.username
    });
  } catch (error) {
    res.status(409).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).send("Incorrect username or password!");

    const correctPass = await bcrypt.compare(req.body.password, user.password);
    if (!correctPass)
      return res.status(401).send("Incorrect username or password!");

    // Remove the password from the response.
    const userObject = user.toObject();
    const { password, ...responseUser } = userObject;

    jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.send({ token, user: responseUser });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
