const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");

const Signup = require("./api/routes/signup");
const Login = require("./api/routes/login");
const Userdetail = require("./api/routes/userdetail");
const GetALlUser = require("./api/routes/getAllUser");
const GetDonation = require("./api/routes/getDonation");
// const userRoutes = require("./api/routes/users");
const config = {
  autoIndex: false,
  useNewUrlParser: true,
};
mongoose
  .connect(
    "mongodb://admin:admin1234@ds159121.mlab.com:59121/parker"
  )
  .then(() => {
    console.log("connected");
  });

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(function (req, res, next) {
  var allowedOrigins = ['http://localhost:3000', 'http://localhost:3000', 'http://192.168.1.104:3000', 'http://192.168.1.104:3000'];
  var origin = req.headers.origin;
  //   if(allowedOrigins.indexOf(origin) > -1){
  //    res.setHeader('Access-Control-Allow-Origin',"*");
  //   }
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.use("/users/signup", Signup);
app.use("/users/signin", Login);
app.use("/users/userData", Userdetail);
app.use("/users/allUsers", GetALlUser);
app.use("/users/getDonation", GetDonation);

module.exports = app;