const adminController = require("../controllers/adminControllers")
const middlewareControllers = require("../middleware/middlewareControllers")
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Router } = require("express");
const { model } = require("mongoose");
const adminControllers = require("../controllers/adminControllers");


router.post('/registerAdmin', adminController.register_admin);

router.post('/loginAdmin', adminController.loginAdmin);

router.post('/logoutAdmin',middlewareControllers.verifyToken, adminControllers.logoutAdmin);

router.delete('/deleteAdmin/:id',middlewareControllers.verifyToken, adminControllers.deleteAdmin);
module.exports = router;