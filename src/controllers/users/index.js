const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const isAvailable = require("./utils");

const register = async (req, res) => {
  try {
    let errors = {};
    let { email, username, password } = req.body;

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
    if (notEmpty) {
      throw errors;
    }

    const hashedPass = await bcrypt.hash(req.body.password, 10);
    password = hashedPass;
    const user = new User({ email, username, password });
    await user.save();

    jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        console.log(token);
        res.send({ token, user });
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
};

const login = async (req, res) => {
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
        console.log(token);
        res.send({ token, user: responseUser });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) return res.status(400).send("No users found!");
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const addAdmin = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(404).send("User not found!");

    user.role = "admin";
    await user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
  getUsers,
  addAdmin,
};
