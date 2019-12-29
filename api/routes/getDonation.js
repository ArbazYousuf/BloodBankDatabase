const express = require("express");
const router = express.Router();
const UserData = require("../modelsSchema`s/donationData");

const mongoose = require("mongoose");

router.get("/:id", (req, res, next) => {
    console.log(req.params.id)
    GetDonation.findOne({ userId: req.params.id }).then((docs) => {
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

router.post("/", (req, res) => {
    const today = new Date();
    // res.json({Message: "chal to rha hy  "})
    let donationData = {
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        bloodGroup: req.body.bloodGroup,
        gender: req.body.gender,
        city: req.body.city,
        address: req.body.address,
        userId: req.body.userId,
        donated: req.body.donated,
        getUserId: req.body.userId,
        created: today
    }
    GetDonation.findOne({
        getUserId: req.body.userId
    }).then((user) => {
        if (!user) {
            GetDonation.create(donationData)
                .then(suc => {
                    res.status(200).json({ status: 200, message: "succesfully added", users: suc })
                })
                .catch(err => res.send("error " + err));
        } else {
            if (user.created.getDate() < today.getDate()) {
                GetDonation.create(donationData)
                .then(suc => {
                    res.status(200).json({ status: 200, message: "succesfully added", users: suc })
                })
                .catch(err => res.send("error " + err));
                // res.status(201).json({ error: "user data exists", status: 201 });
            } else {
                res.status(201).json({ error: "You may donate after 1 day", status: 201 });
            }
        }
    })
});

module.exports = router;