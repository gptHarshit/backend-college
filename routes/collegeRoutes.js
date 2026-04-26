const express = require("express");
const router = express.Router();

const {
  addCollege,
  getColleges,
  filterColleges
} = require("../controllers/collegeController");


router.post("/add", addCollege);


router.get("/", getColleges);


router.get("/filter", filterColleges);

module.exports = router;