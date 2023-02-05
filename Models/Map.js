const mongoose = require('mongoose');


const GeoSchema = new mongoose.Schema({
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
 
    User_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
  },
},


);


module.exports = mongoose.model('Store', GeoSchema);
