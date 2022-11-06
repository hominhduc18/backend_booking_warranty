//auth đảm nhiệm việc đăng ký và đăng nhập
const userController = require("../controllers/userControllers")


const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Router } = require("express");

// gọi đến MVC ở controller
router.post('/register', userController.registerUser);
router.post('/loginUser', userController.loginUsers);

router.get('/getuser', userController.getAllUser);

router.put('/updateUser/:id', userController.putUsers);


router.delete('/deleteUser/:id', userController.deleteAnUser);

module.exports = router;