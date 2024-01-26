


const express = require("express");
const router = express.Router();
const {createJobApplication} = require("../Controller/jobformcontroller");


router
  .post("/submit",createJobApplication)


module.exports = router;
