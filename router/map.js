const express = require('express');
const ggMap = require('../controllers/mapControllers');
const { getStores, addStore } = require('../controllers/mapControllers');
const router = require('express').Router();
const middlewareControllers = require("../middleware/middlewareControllers")
const Ninja = require('../Models/Map')



// router.get('/getMap', ggMap.getStores);
router.post('/location', ggMap.location);
// router.get('/get_location', function(req, res){
//     Ninja.geoNear(
//       {type: "point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
//       {maxDistance: 100000, spherical: true}
//     ).then(function(get_location){
//       res.send(get_location);
//     });
//   });
router.get('/get_location', ggMap.Geo_near);
module.exports = router;