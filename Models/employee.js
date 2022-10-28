const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minLength: 6,
        maxLength: 25,
        unique: true  
    },
    email:{
        type: String,
        required: true,
        minLength: 6,
        maxLength: 25,
        unique: true 
    }, 
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    phone:{
        type: Number,
        minLength:1,
        maxLength:12,
        unique: true,
        required: true
    },
    sex:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 10,
    },
    history: {
        experience: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 20,
        },
        start_avg: {
            type: Number,
            required: true,
            minLength: 5,
            maxLength: 20,
        },
        maintenance: {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Maintenance",// tham chieu 
        },

    },
},
// thời gian update
{timestamps: true}
);

let Employee = mongoose.model('Employee',employeeSchema );
module.exports = Employee;

