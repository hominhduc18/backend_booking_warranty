//auth đảm nhiệm việc đăng ký và đăng nhập
const userController = require("../controllers/userControllers")
const middlewareControllers = require("../middleware/middlewareControllers")
const User = require("../Models/User");
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Router } = require("express");

// gọi đến MVC ở controller
router.post('/register', userController.registerUser);
router.post('/loginUser', userController.loginUsers);
router.post('/logoutUser',middlewareControllers.verifyToken, userController.logoutUser);
router.post('/changepassword', userController.changePasswordUser);
router.post('/emailsend', userController.emailSendUser);
router.post('/booking', userController.Booking_service);
router.post('/getbooking', userController.all_Booking_service);
router.get('/getAlluser', middlewareControllers.verifyToken,userController.getAllUser);
router.get('/getAnUser', middlewareControllers.verifyToken,userController.getUser);
router.get('/getABooking/:id', userController.get_Booking_service);


router.put('/updateUser/:id', userController.putUsers);
router.put('/updatePassword', middlewareControllers.verifyToken,userController.updatePassword);
router.put('/update_location', userController.putUsers_location);

router.delete('/deleteUser/:id',middlewareControllers.verifyToken, middlewareControllers.verifydelete,userController.deleteAnUser);



module.exports = router;