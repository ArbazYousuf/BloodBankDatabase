const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../modelsSchema`s/userSignup");

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {

  Users.find().exec().then((docs) => {
    res.status(200).json(docs);

  }).catch((err) => {
    res.status(500).json({
      error: err
    })
    console.log(err)
  })
});

router.post("/", (req, res) => {
  // res.json({Message: "chal to rha hy  "})
  Users.findOne({ email: req.body.email })
    .then(user => {
      console.log("findly succesfully ", user)
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            email: user.email
          };
          let token = jwt.sign(payload, "125", {
            expiresIn: 1440
          });
          res.send({ ...payload, token });
        } else {
          res.json({ error: "User does not exist" });
        }
      }else{
        res.status(201).json({error: "User is not exists"})
      }
    })
    .catch(err => res.status(201).json({ error: err }));
});

module.exports = router;