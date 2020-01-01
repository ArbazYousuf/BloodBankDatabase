const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required: true},
    contactNumber: {type:Number, required: true},
    bloodGroup: {type:String, required: true},
    gender: {type:String, required: true},
    city: {type:String, required: true},
    address: {type:String, required: true},
    userId: {type:String, required: true},
    updated: {type: String, required: false},
    getUserId: {type: Array, required: false},
    donated: {type: Boolean, required: true},
    created: {type: String, required: true},
    
});

module.exports = mongoose.model("UserData", userSchema);