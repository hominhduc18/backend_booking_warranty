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
      validate: {
        validator: item => {
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(item)
        },
        message: "Email không hợp lệ"
    }
    },
  //   code: {
  //     type: Number,
  // },
  //   expiresIn: {
  //     type: Number
  // },
    address:{
      type: String,
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
    
    location: {
      latitude: {
          type: Number
      },
      longitude: {
          type: Number
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

    });
let User = mongoose.model("User", userSchema);
module.exports = User;
