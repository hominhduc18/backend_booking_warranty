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
//app

//
router.post('/logoutUser',middlewareControllers.verifyToken, userController.logoutUser);
router.post('/changepassword', userController.changePasswordUser);
router.post('/useremailsend', userController.emailSendUser);
router.post('/booking', userController.Booking_service);
router.post('/getbooking', userController.all_Booking_service);


router.get('/getAlluser', middlewareControllers.verifyToken,userController.getAllUser);
// router.get('/getAnUser/:id',userController.getUser);
router.get('/getABooking/:id', userController.get_Booking_service);
router.get('/logoutUser',middlewareControllers.verifyToken, userController.logoutUser);
router.get('/get/An/User/:id',userController.getUser);
router.get('/:id',userController.getAnAuthor);
router.get('/:id/location', userController.get_location_user);

router.get('/address/userMainternace/:id',userController.get_address_userMain);


router.put('/updateUser/:id', userController.putUsers);
router.put('/updatePassword', middlewareControllers.verifyToken,userController.updatePassword);
router.put('/update_location/:id', userController.putUsers_location);

router.delete('/deleteUser/:id',middlewareControllers.verifyToken, middlewareControllers.verifydelete,userController.deleteAnUser);



module.exports = router;