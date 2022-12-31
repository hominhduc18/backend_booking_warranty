const employeeControllers = require("../controllers/employeeControllers")
const router = require('express').Router();
const { Router } = require("express");
const middlewareController = require("../middleware/middlewareControllers");

router.post('/registerEmployee', employeeControllers.registerEmployee);
router.post('/loginEmployee', employeeControllers.loginEmployee);
router.post('/logoutEmployee', middlewareController.verifyToken, employeeControllers.logoutEmployee);
router.post('/change_password', employeeControllers.changePasswordEmployee);
router.post('/email_send', employeeControllers.emailSendEmployee);

router.get('/getAnEmployee/:id', employeeControllers.getAnEmployee);


router.put('/updateEmployee/:id', employeeControllers.updateAnEmployee);

router.delete('/deleteEmployee/:id',middlewareController.verifydelete,employeeControllers.deleteAnEmployee);


module.exports = router;