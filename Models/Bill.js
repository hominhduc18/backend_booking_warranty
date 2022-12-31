const mongoose = require("mongoose");
//
const BillSchema = new mongoose.Schema(
  {
    billId: {
        type: Number,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    amount: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        key: Number,
    },
    description:{
        type:String,
        require:true,
        default:""
    },
    method:{
        type: String,
        require:true,
    },
    transactionId:{
        type: String,
        require:true,
        default:""
    }

},
    {timestamps: true}

);
const bill = mongoose.model("Bill", BillSchema);
module.exports = bill;
