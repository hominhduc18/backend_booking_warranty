const mongoose = require("mongoose");
//
const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
        type: Number,
        unique: false,
      },
    admin:{
        type: Boolean,//phai chu ko 
    },

    admin_user: {
        maintenance: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
      },
    },
    admin_employee:{
      maintenance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },
    }
  },

  { timestamps: true }
);
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
