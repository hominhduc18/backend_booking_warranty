const mongoose = require("mongoose");


const otpSchema = new mongoose.Schema(
    {
    email: {type: String,},
    code: {type: String,},
    expiresIn: {type: Number}
     },  
     { timestamps: true }
);
let otp = mongoose.model("OTP", otpSchema);
module.exports = otp;
