const express = require("express");
const path = require("path");
const app = express();
const UserRouter = require("./routers/userRouter");
const ClassRouter = require("./routers/classRouter");
const IndexRouter = require("./routers/indexRouter");
var cookieParser = require("cookie-parser");

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, "./publics")));

app.use("/user", UserRouter);
app.use("/class", ClassRouter);
app.use("/", IndexRouter);

const PORT = process.env.PORT || 3000;
var server=app.listen(PORT,function() {});