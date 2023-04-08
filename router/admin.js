
const router = require('express').Router();
const bcrypt = require('bcrypt');

const adminControllers = require("../controllers/adminControllers");



router.post('/registerAdmin', adminControllers.register_admin);

router.post('/loginAdmin', adminControllers.loginAdmin);

router.post('/logoutAdmin',middlewareControllers.verifyToken, adminControllers.logoutAdmin);

router.delete('/deleteAdmin/:id',middlewareControllers.verifyToken, adminControllers.deleteAdmin);
module.exports = router;