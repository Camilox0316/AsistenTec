const express = require('express');
const router = express.Router();
const adminUserControllers = require('../../controllers/AdminUser');
const verifyJWT = require('../../middleware/verifyJWT');
const { uploadProfileImage } = require('../../utilities/multerConfig');

router.route('/auth')
    .post(adminUserControllers.loginUser);
router.route('/register')
    .post(uploadProfileImage, adminUserControllers.registerUser);

router.route('/updatePassword')
    .put(adminUserControllers.updatePassword);
    
module.exports = router;