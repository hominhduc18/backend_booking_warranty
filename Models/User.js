const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 6,
      maxLength: 25,
      validate: {
        validator: item => {
            return item.length >= 6
        },
        message: "Tên đăng nhập phải dài hơn 5 kí tự"
    }
    },
    email: {
      type: String,
      minLength: 6,
      maxLength: 25,
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
      minLength: 6,
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
let User = mongoose.model("users", userSchema);
module.exports = User;
