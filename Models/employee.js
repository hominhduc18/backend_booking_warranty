const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
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
      experience: {
        type: String,
        minLength: 5,
        maxLength: 20,
      },
      start_avg: {
        type: Number,
        minLength: 5,
        maxLength: 20,
      },
      maintenance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Maintenance",
      },
      location: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
      },
    },
  },
  // thời gian update
  { timestamps: true }
);
let Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
