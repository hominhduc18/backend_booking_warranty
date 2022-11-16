//auth đảm nhiệm việc đăng ký và đăng nhập
const userController = require("../controllers/userControllers")
const middlewareControllers = require("../middleware/middlewareControllers")

const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Router } = require("express");

// gọi đến MVC ở controller
router.post('/register', userController.registerUser);
router.post('/loginUser', userController.loginUsers);
router.post('/logoutUser',middlewareControllers.verifyToken, userController.logoutUser);// user phải login vs logout đc nên có midelware
router.post('/change_password', userController.changePasswordUser);
router.post('/email_send', userController.emailSendUser);


router.get('/getAlluser', middlewareControllers.verifyToken,userController.getAllUser);
router.get('getUser', middlewareControllers.verifyToken,userController.getUser);

router.put('/updateUser/:id', userController.putUsers);


router.delete('/deleteUser/:id', middlewareControllers.verifydelete,userController.deleteAnUser);

module.exports = router;