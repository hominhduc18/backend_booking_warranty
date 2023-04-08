
const router = require('express').Router();
const bcrypt = require('bcrypt');

const adminControllers = require("../controllers/adminControllers");



router.post('/registerAdmin', adminControllers.register_admin);

router.post('/loginAdmin', adminControllers.loginAdmin);

router.post('/logoutAdmin', adminControllers.logoutAdmin);

router.delete('/deleteAdmin/:id', adminControllers.deleteAdmin);
module.exports = router;