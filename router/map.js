const express = require('express');
const ggMap = require('../controllers/mapControllers');
const { getStores, addStore } = require('../controllers/mapControllers');
const router = require('express').Router();
const middlewareControllers = require("../middleware/middlewareControllers")


// router
//   .route('/')
//   .get(getStores)
//   .post(addStore);

router.get('/getMap', ggMap.getStores);
router.post('/addMap', ggMap.addStore);

module.exports = router;