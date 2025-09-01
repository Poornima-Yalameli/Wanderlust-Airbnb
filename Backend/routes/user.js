const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/users.js");

router.post("/signup", wrapAsync(userController.signup));

router.post("/login", userController.login);

router.get("/logout", userController.logout);

module.exports = router;
