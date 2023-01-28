const express = require("express");
const usersController = require("../../controllers/users");
const { adminAuth } = require("../../middleware/auth");

const router = new express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/users", adminAuth, usersController.getUsers);
router.patch("/users/role/admin/:userId", adminAuth, usersController.addAdmin);

module.exports = router;
