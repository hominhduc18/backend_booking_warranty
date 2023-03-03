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
    },
    status: {// tình trạng
      type: String,
      default: unassigned, 
     /*
     1- Success
     0 - process
      0- processing
      - 1 - unassigned
      cancel
     */ // chưa nhận  0 nhận chưa ht 1 hoàn thành 
  },
  },

  { timestamps: true }
);
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
