const express = require("express");
const router = express.Router();
const adminUserControllers = require("../../controllers/AdminUser");
const { authRequire } = require("../../middleware/validateToken");
const { uploadProfileImage } = require("../../utilities/multerConfig");

router.route("/auth").post(adminUserControllers.loginUser);
router
  .route("/register")
  .post(uploadProfileImage, adminUserControllers.registerUser);

router.route("/updatePassword").put(adminUserControllers.updatePassword);
router.route("/verifyToken").get(adminUserControllers.verifyToken);
router.route("/profile").get(authRequire, adminUserControllers.profile);
router.route("/logout").put(adminUserControllers.logout);
router.route("/getAdmins").get(adminUserControllers.getAdmins_profes);
//Nota para el editar perfil se debe de tener el authRequiere

module.exports = router;
