const employeeControllers = require("../controllers/employeeControllers")
const router = require('express').Router();
const { Router } = require("express");
const middlewareController = require("../middleware/middlewareControllers");

router.post('/registerEmployee', employeeControllers.registerEmployee);
router.post('/loginEmployee', employeeControllers.loginEmployee);
router.post('/logoutEmployee', middlewareController.verifyToken, employeeControllers.logoutEmployee);
router.post('/changepassword', employeeControllers.changePasswordEmployee);
router.post('/emailsend', employeeControllers.emailSendEmployee);
router.post('/epltakebooking', employeeControllers.Epl_Booking_service);

router.get('/getAnEmployee/:id', employeeControllers.getAnEmployee);
router.get('/getAllEmployee', middlewareController.verifyToken,employeeControllers.getAllEmployee);

router.put('/updateEmployee/:id', employeeControllers.updateAnEmployee);

router.delete('/deleteEmployee/:id',middlewareController.verifydelete,employeeControllers.deleteAnEmployee);


module.exports = router;