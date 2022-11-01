const mongoose = require('mongoose');
const maintenanceSchema = new mongoose.Schema({
    date:{
        type: String,
        minLength: 1,
        maxLength: 25,  
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    employee:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Employee",
    },
    description:{
        type: String,
        minLength:1,
        maxLength:250,
        required: true
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

   
},
// thời gian update
{timestamps: true}
);

let Maintenance =mongoose.model('Maintenance',maintenanceSchema);
module.exports = Maintenance;




