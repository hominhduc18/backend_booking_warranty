const mongoose = require("mongoose");
//
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      
      minLength: 6,
      maxLength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 25,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
   
    phone: {
      type: Number,
      minLength: 1,
      maxLength: 12,
      unique: true,
      
    },
    sex: {
      type: String,
      
      minLength: 3,
      maxLength: 10,
    },
    history: {
      maintenance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Maintenance",
      },
    },
  },
  // thời gian update
  { timestamps: true }
);
let User = mongoose.model("User", userSchema);
module.exports = User;
