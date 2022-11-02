const employeeControllers = require("../controllers/employeeControllers")
const router = require('express').Router();
const { Router } = require("express");

router.post('/registerEmployee', employeeControllers.registerEmployee);

router.post('/loginEmployee', employeeControllers.loginEmployee);
router.get('/getAnEmployee', employeeControllers.getAnEmployee);

router.post('/LoginEmployees', employeeControllers.loginEmployees);

router.get('/getAllEmployee', employeeControllers.getAllEmployee);
router.delete('/deleteEmployee/:id', employeeControllers.deleteAnEmployee);
module.exports = router;