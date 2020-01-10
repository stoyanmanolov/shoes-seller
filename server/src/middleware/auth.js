const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req, res) => {
  try {
    const { username, password } = req.body;

    const requestToken = req.header("X-Auth-Token");
    if (!requestToken) return res.status(401).send("Please provide a token!");

    const decoded = jwt.verify(requestToken, process.env.JWT_SECRET);
    if (!decoded) throw new Error("Invalid token!");

    return decoded;
  } catch (error) {
    res.status(401).send(error);
  }
};

const userAuth = async (req, res, next) => {
  const decodedToken = verifyToken(req, res);
  req.user = decodedToken;
  next();
};

const adminAuth = async (req, res, next) => {
  try {
    const decodedToken = verifyToken(req, res);
    const user = await User.findById(decodedToken.id);

    if (!user) return res.status(404).send("User not found!");
    if (user.role === "admin") {
      req.user = decodedToken;
      next();
    } else
      return res
        .status(401)
        .send("Access denied. Only admins can access this.");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { userAuth, adminAuth };
