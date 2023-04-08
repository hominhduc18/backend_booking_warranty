const mongoose = require("mongoose");
//
const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,

    },
    phone: {
        type: Number,
      
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
  },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
    { timestamps: true }
);
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
