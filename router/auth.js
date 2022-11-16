const authController = require("../controllers/authControllers")
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Router } = require("express");

router.post('/register', authController.registerUser);
router.post('/loginUser', authController.loginUsers);

router.get('/getuser', authController.getAllUser);

//
router.delete('/deleteUser/:id', authController.deleteAnUser);

module.exports = router;