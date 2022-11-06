const employeeControllers = require("../controllers/employeeControllers")
const router = require('express').Router();
const { Router } = require("express");

router.post('/registerEmployee', employeeControllers.registerEmployee);
router.post('/loginEmployee', employeeControllers.loginEmployee);
router.post('/LoginEmployees', employeeControllers.loginEmployees);


router.get('/getAnEmployee', employeeControllers.getAnEmployee);
router.get('/getAllEmployee', employeeControllers.getAllEmployee);
// router.get('/get_maintenance', employeeControllers.get_maintenanc);

router.delete('/deleteEmployee/:id', employeeControllers.deleteAnEmployee);
module.exports = router;