//auth đảm nhiệm việc đăng ký và đăng nhập
const maintenanceControllers = require("../controllers/maintenanceControllers")

const router = require('express').Router();
const bcrypt = require('bcrypt');

// gọi đến MVC ở controller
router.post('/registermain', maintenanceControllers.registermain);




module.exports = router;