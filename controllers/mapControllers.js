const Store = require('../Models/Map');

const Map_location = {
  location: async (req, res) => {
    try{
      const new_location = await new Store({
        type: req.body.type,
        coordinates: req.body.coordinates,
    });
    const loca = await new_location.save();
    res.status(200).json(loca);

    }catch (err) {
      res.status(500).json(err);
      console.log(err);
  }
  },
//   Geo_near: async (req, res) => {
//     try {
//       const get_location = await new Store({
//         type: req.body.type,
//         coordinates: [parseFloat(req.query.lng),parseFloat(req.query.lat)],
//     })
//   }catch (err) {
//     res.status(500).json(err);
//     console.log(err);
//   }
// }

Geo_near:async (req, res)=>{
  try {
    const lat = await Store.find({
      type: "point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
      {maxDistance: 100000, spherical: true}
    )
    res.send(lat);
    console.log("2222");
    res.status(200).json(lat);
  }catch (err) {
        res.status(500).json(err);
        console.log(err);
      }
  
}
}


module.exports = Map_location;