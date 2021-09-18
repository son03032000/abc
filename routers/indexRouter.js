const router = require("express").Router();
const path = require("path");
const UserModel = require("../models/userModel")
const ClassModel = require("../models/classModel");


router.get("/", async (req, res) => {
  try {
    const classList = await ClassModel.find();
    const listUser = await UserModel.find();
    res.render("pages/index", { classList, listUser});
  } catch (error) {
    res.json(error);
  }
});

router.get('/createClass', function(req, res) {
  res.render('pages/class');
});

router.get('/login', function(req, res) {
  res.render('pages/login');
});



module.exports = router;
