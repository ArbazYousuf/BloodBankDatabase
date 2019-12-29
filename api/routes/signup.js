const express = require("express");
const router = express.Router();
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

router.post("/", (req, res, next) => {
    const today = new Date();
    const userData = {
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password,
        created: today
    };
    console.log(Users)
    Users.findOne({
        email: req.body.email
    })
        .then(user => {
            console.log(user)
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash;
                    Users.create(userData)
                        .then(user => {
                            res.status(200).json({ status: user.email + " registered!" });
                        })
                        .catch(err => {
                            res.status(500).json({ error: err });
                        });
                });
            } else {
                res.status(201).json({ error: "user already exists" });
            }
        })
        .catch(err => res.json("error " + err));

});

module.exports = router