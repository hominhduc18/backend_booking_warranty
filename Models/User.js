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
    createdAt: { 
      type: Date, 
      expires: '1w' 
    },// hẹnj để xóa sau 1 w
 
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
      latitude: Number,
      longitude: Number
    },
    
    phone: {
      type: Number,
      
    },
    sex: {
      type: String,

    },
    avatar: {
      type: String,
    },

    status: {// tình trạng
      type: String,
        //chưa nhận  0 nhận chưa ht 1 hoàn thành 
  },
  
    maintenance_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Maintenance",
      },

    });
let User = mongoose.model("User", userSchema);
module.exports = User;
