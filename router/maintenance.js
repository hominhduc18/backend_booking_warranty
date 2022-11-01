//auth đảm nhiệm việc đăng ký và đăng nhập
const maintenanceControllers = require("../controllers/maintenanceControllers")

const router = require('express').Router();
const bcrypt = require('bcrypt');

// gọi đến MVC ở controller
router.post('/addMaintenance', maintenanceControllers.addMaintenance);
router.get('/getAllMaintenance', maintenanceControllers.getAllMaintenance);
router.get('/getAMaintenance/:id', maintenanceControllers.getAMaintenance);
router.delete('/deleteAMaintenance/:id', maintenanceControllers.deleteAMaintenance);
router.put('/updateAMaintenance/:id', maintenanceControllers.updateAMaintenance);




module.exports = router;