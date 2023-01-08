const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      validate: {
        validator: item => {
            return item.length >= 6
        },
        message: "Tên đăng nhập phải dài hơn 5 kí tự"
    }
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: item => {
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(item)
        },
        message: "Email không hợp lệ"
    }
    },
    password: {
      type: String,
      validate: {
        validator: item => {
            return item.length >= 8
        },
        message: "Mật khẩu phải dài hơn 8 kí tự"
    }
    },
   
    phone: {
      type: Number,
      
    },
    sex: {
      type: String,

    },
    maintenance_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Maintenance",
      },
    },
   
  // thời gian update
  { timestamps: true }
);
let User = mongoose.model("User", userSchema);
module.exports = User;
