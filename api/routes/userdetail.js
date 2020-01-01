const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserData = require("../modelsSchema`s/userData");

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

router.get("/:id", (req, res, next) => {
  console.log(req.params.id)
  UserData.findOne({ userId: req.params.id }).then((docs) => {
    if (docs !== null) {
      res.status(200).json(docs);
    } else {
      res.status(201).json({ error: "User data is not exists", status: 201 })
    }
  }).catch((err) => {
    res.status(500).json({
      error: err
    })
    console.log(err)
  })
});

router.delete("/:id", (req, res, next) => {
  console.log(req.params.id)
  UserData.findOneAndRemove({ userId: req.params.id }).then((docs) => {
    if (docs !== null) {
      res.status(200).json(docs);
    } else {
      res.status(201).json({ error: "User data is not exists", status: 201 })
    }
  }).catch((err) => {
    res.status(500).json({
      error: err
    })
    console.log(err)
  })
});

router.put("/:id", (req, res, next) => {
  console.log(req.params.id)
  UserData.findOneAndUpdate({ userId: req.params.id }, req.body.data, { new: true }, (err, doc) => {
    if (err) {
      return res.status(200).json({ message: "nhi chal rha", error: err })
    } else {
      return res.status(200).json({ message: "SuccessFully Update", doc })
    }
  }).then((docs) => {

  }).catch((err) => {
    res.status(500).json({
      error: err
    })
    console.log(err)
  })
});

router.post("/", (req, res) => {
  const today = new Date();
  // res.json({Message: "chal to rha hy  "})
  let userData = {
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    contactNumber: req.body.contactNumber,
    bloodGroup: req.body.bloodGroup,
    gender: req.body.gender,
    city: req.body.city,
    address: req.body.address,
    userId: req.body.userId,
    donated: req.body.donated,
    created: today
  }
  UserData.findOne({
    userId: req.body.userId
  }).then((user) => {
    if (!user) {
      console.log("no user")
      UserData.create(userData)
        .then(suc => {
          res.status(200).json({ status: 200, message: "succesfully added", users: suc })
        })
        .catch(err => res.send("error " + err));
    } else {
      console.log("there is user")

      res.status(201).json({ error: "user data exists", status: 201 });
    }
  })
});

module.exports = router;