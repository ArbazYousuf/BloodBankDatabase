const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserData = require("../modelsSchema`s/userData");

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
    console.log(req.params.id)
    UserData.find().exec().then((docs) => {
        if (docs !== null) {
            res.status(200).json({ data: docs, status: 200 });
        } else {
            res.status(201).json({ error: "User data is not exists", status: 201 })
        }
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
});

router.put("/", (req, res) => {
    const today = new Date();
    // res.json({Message: "chal to rha hy  "})



    let allId;
    UserData.find({ userId: req.body.userId }).then((docs) => {
        if (docs !== null) {
            if (docs[0].getUserId) {
                allId = docs[0].getUserId;
                allId.push(req.body.id)
                // console.log(docs, allId)

                let newData = {
                    donated: true,
                    updated: today,
                    getUserId: allId
                }
                UserData.findOneAndUpdate(
                    { userId: req.body.userId }
                    , newData, { new: true }, (err, doc) => {
                        if (err) {
                            return res.status(200).json({ message: "nhi chal rha", error: err })
                        } else {
                            return res.status(200).json({ message: "SuccessFully Update", doc })
                        }
                    })
            } else {
                allId = []
                allId.push(req.body.id)

                let newData = {
                    donated: true,
                    update: today,
                    getUserId: allId
                }
                UserData.findOneAndUpdate(
                    { userId: req.body.userId }
                    , newData, { new: true }, (err, doc) => {
                        if (err) {
                            return res.status(200).json({ message: "nhi chal rha", error: err })
                        } else {
                            return res.status(200).json({ message: "SuccessFully Update", doc })
                        }
                    })
            }
        } else {
            res.status(201).json({ error: "User data is not exists", status: 201 })
        }

    }).catch((err) => {
        res.status(500).json({
            message: "nhi mil rha",
            error: err
        })
    })

    // .then((user) => {
    //     console.log("newData", user)
    //   if (!user) {
    //     res.status(200).json({
    //     status: 200,
    //     message: "success",
    //     data: user
    //     })
    //   } else {
    //     res.status(201).json({ error: "user data exists", status: 201 });
    //   }
    // })
});



module.exports = router;