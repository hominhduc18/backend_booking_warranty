//auth đảm nhiệm việc đăng ký và đăng nhập
const maintenanceControllers = require("../controllers/maintenanceControllers")

const router = require('express').Router();
const bcrypt = require('bcrypt');

// gọi đến MVC ở controller
router.post('/addMaintenance', maintenanceControllers.addMaintenance);
router.post('/addBooking', maintenanceControllers.addBooking);
router.post('/useraddBooking', maintenanceControllers.user_booking_service);
router.put('/employee/receive/:id', maintenanceControllers.add_employee_service);
router.put('/employee/complete/:id', maintenanceControllers.complete_maintenance_service);

router.post('/usergetaddBooking', maintenanceControllers.user_all_Booking_service);
router.post('/emladdBooking', maintenanceControllers.Epl_booking_service);
router.post('/emltakeaddBooking', maintenanceControllers.Epl_all_Booking_service);
router.post('/app/add/booking',maintenanceControllers.create_booking_app);
router.post('/feedback/:id/user', maintenanceControllers.user_feed_back);
router.get('/getAllMaintenance', maintenanceControllers.getAllMaintenance);
router.get('/getAMaintenance/:id', maintenanceControllers.getAMaintenance);

router.get('/getUserAMaintenance/:id', maintenanceControllers.get_User_Booking_service);

router.get('/get_order/:id', maintenanceControllers.getorderMaintenance);
router.delete('/deleteAMaintenance/:id', maintenanceControllers.deleteAMaintenance);


router.put('/updateAMaintenance/:id', maintenanceControllers.updateMaintenance);




module.exports = router;