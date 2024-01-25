const express = require("express");
const router = express.Router();
const { createInstructor, getAllInstructor } = require("../Controller/instructorController");
const passport = require("passport");

router
  .post("/create-instructor",passport.authenticate('jwt') , createInstructor)
  .get('/get-allinstructor', passport.authenticate('jwt'), getAllInstructor)

module.exports = router;
