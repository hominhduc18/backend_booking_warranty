const mongoose = require("mongoose");
//
const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
        minLength: 1,
        maxLength: 12,
        unique: true,
        required: true,
      },
    admin:{
        type: Boolean,//phai chu ko
        default: false,// bat ky user nao ban dau deu ko phai la admin
    },

    admin_user: {
        maintenance: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
      },
    },
  },

  { timestamps: true }
);
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
