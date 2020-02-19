const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req, res) => {
  const requestToken = req.get("X-Auth-Token");
  if (!requestToken) return new Error("Please provide a token!");

  const decoded = jwt.verify(requestToken, process.env.JWT_SECRET);
  if (!decoded) return new Error("Invalid token! Please login.");

  return decoded;
};

const userAuth = async (req, res, next) => {
  try {
    const decodedToken = verifyToken(req, res);

    req.user = decodedToken;
    next();
  } catch (error) {
    res.send(error);
  }
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
    res.send(error);
  }
};

module.exports = { userAuth, adminAuth };
