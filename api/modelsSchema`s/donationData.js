const mongoose = require("mongoose");

const getDonationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required: true},
    contactNumber: {type:Number, required: true},
    bloodGroup: {type:String, required: true},
    gender: {type:String, required: true},
    city: {type:String, required: true},
    address: {type:String, required: true},
    userId: {type:String, required: false},
    donated: {type: Boolean, required: true},
    getUserId: {type: String, required: true},
    created: {type: String, required: true},
    update: {type: String, required: false}
    
});

module.exports = mongoose.model("GetDonation", getDonationSchema);