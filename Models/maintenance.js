 const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    date:{
        type: String,
        
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    employee:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Employee",
    },
    username:{
        type: String,
    },
    phone:{
        type: String,
    },

    description:{
        type: String,
    },
    noted:{
        type: String,
    },
    startHour:{
        type:Date,
    },
    endHour:{
        type:Date,
    },
    history: {
        start: {
            type: Number,
            minLength: 1,
            maxLength: 5,
        },
        comment: {
            type: String,
            minLength: 2,
            maxLength: 250,
        }
    },
    address: {
        type: String,
      },
    status: {// tình trạng
        type: String,
        default: unassigned, //chưa nhận  0 nhận chưa ht 1 hoàn thành 
    },

   
},
// thời gian update
{timestamps: true}
);

let Maintenance =mongoose.model('Maintenance',maintenanceSchema);
module.exports = Maintenance;




