const employeeControllers = require("../controllers/employeeControllers")
const router = require('express').Router();
const { Router } = require("express");
const middlewareController = require("../middleware/middlewareControllers");

router.post('/registerEmployee', employeeControllers.registerEmployee);
router.post('/loginEmployee', employeeControllers.loginEmployee);
router.post('/logoutEmployee', middlewareController.verifyToken, employeeControllers.logoutEmployee);
router.post('/change_password', employeeControllers.changePasswordEmployee);
router.post('/email_send', employeeControllers.emailSendEmployee);



router.get('/getAllEmployee', employeeControllers.getAllEmployee);
router.delete('/deleteEmployee/:id',middlewareController.verifyToken,employeeControllers.deleteAnEmployee);


router.get('/getAnEmployee', employeeControllers.getAnEmployee);


router.put('/updateUser/:id', employeeControllers.updateAnEmployee);


router.delete('/deleteEmployee/:id', employeeControllers.deleteAnEmployee);
module.exports = router;