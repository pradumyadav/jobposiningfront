const express = require("express");
const router = express.Router();
const { createUser, loginUser, getUser, logout } = require("../Controller/authController");
const passport = require("passport");

router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/get-user", passport.authenticate('jwt'), getUser)
  .get("/logout", passport.authenticate('jwt'), logout);


module.exports = router;
