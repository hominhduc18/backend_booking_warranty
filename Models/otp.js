const mongoose = require("mongoose");


const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String
        },
        code: {
            type: Number,
        },
        expiresIn: {
            type: Number
        }
     },  
     { timestamps: true }
);
let email = mongoose.model("OTPEmail", otpSchema);
module.exports = email;
