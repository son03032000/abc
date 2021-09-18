const router = require("express").Router();
const UserModel = require("../models/userModel");
const BlackListModel = require("../models/blackListModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { checkLogin, checkAdmin } = require("../middleWare/check");

router.get("/", (req, res) => {
  UserModel.find()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/pagination", checkLogin, async (req, res) => {
  try {
    if (req.query.class) {
      const data = await UserModel.find({ class: req.query.class })
        .skip((req.query.page - 1) * req.query.size)
        .limit(req.query.size * 1);
      res.json({ data, status: 200, mess: "ok", role: req.role });
    } else {
      const data = await UserModel.find({})
        .skip((req.query.page - 1) * req.query.size)
        .limit(req.query.size * 1);
      res.json({ data, status: 200, mess: "ok", role: req.role });
    }
  } catch (error) {
    console.log(error);
    res.json({ error, mess: "server error", status: 500 });
  }
});

router.post("/login", async (req, res) => {
  try {
    const checkUser = await UserModel.findOne({
      username: req.body.username,
    });
    if (checkUser) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        checkUser.password
      );
      if (checkUser) {
        const token = jwt.sign({ id: checkUser._id }, "thai", {
          expiresIn: "30d",
        });
        res.json({ status: 200, id: token, mess: "ok" });
      } else {
        res.json({ status: 400, mess: "sai password" });
      }
    } else {
      res.json({ status: 400, mess: "sai username" });
    }
  } catch (error) {
    res.json({ error, mess: "server error", status: 500 });
  }
});

router.post("/checkLogin", async (req, res) => {
  try {
    if (req.cookies.user) {
      const token = req.cookies.user;
      const checkToken = await BlackListModel.findOne({ token });
      if (checkToken) {
        res.json({ mess: "cookie bị hạn chế", status: 400 });
      } else {
        const id = jwt.verify(token, "thai").id;
        const checkUser = await UserModel.findOne({ _id: id });
        if (checkUser) {
          res.json({ mess: "user da dang nhap", status: 200 });
        } else {
          res.json({ mess: "cookie khong hop le", status: 400 });
        }
      }
    } else {
      res.json({ mess: "chua dang nhap", status: 400 });
    }
  } catch (error) {
    res.json({ error, mess: "server error", status: 500 });
  }
});

router.post("/logout", async (req, res) => {
  try {
    await BlackListModel.create({ token: req.cookies.user });
    res.json({ status: 200, mess: "ok" });
  } catch (error) {
    res.json({ error, mess: "server error", status: 500 });
  }
});

router.get("/:id", (req, res) => {
  UserModel.findOne({ _id: req.params.id })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/", async (req, res) => {
  try {
    const checkUser = await UserModel.findOne({ username: req.body.username });
    if (checkUser) {
      res.json({ status: 400, mess: "username đã sử dung" });
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      await UserModel.create({
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        class: req.body.class,
      });
      res.json({ status: 200, mess: "tao tk thanh cong" });
    }
  } catch (error) {
    res.json({ status: 500, error, mess: "loi server" });
  }
});

router.put("/:id", checkLogin, (req, res) => {
  UserModel.updateOne(
    {
      username: req.body.username,
      _id: req.params.id,
      password: req.body.password,
    },
    { password: req.body.newPass }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:id", checkLogin, checkAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await UserModel.deleteOne({ _id: userId });
    if (result.deletedCount !== 0) {
      res.json({ status: 200, mess: "xoa thanh cong" });
    } else {
      res.json({ status: 400, mess: "khong tim thay user" });
    }
  } catch (error) {
    res.json({ status: 500, error, mess: "loi server" });
  }
});

module.exports = router;
