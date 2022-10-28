const employeeControllers = require("../controllers/employeeControllers")
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Router } = require("express");

router.post('/registerEmployee', employeeControllers.registerEmployee);

router.get('/getAllEmployee', employeeControllers.getAllEmployee);
router.delete('/deleteEmployee/:id', employeeControllers.deleteAnEmployee);


module.exports = router;