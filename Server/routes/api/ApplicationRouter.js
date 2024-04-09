const express = require('express');
const ApplicationController = require("../../controllers/ApplicationController");
const router = express.Router();

router.route("/create").post(ApplicationController.createApplication);
router.route("/getAll").get(ApplicationController.listApplications);
router.route("/getById/:id").get(ApplicationController.getApplication);
router.route("/updateById/:id").put( ApplicationController.updateApplication);
router.route("/delete/:id").delete(ApplicationController.deleteApplication);

module.exports = router;
