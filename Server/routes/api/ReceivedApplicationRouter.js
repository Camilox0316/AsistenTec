const express = require('express');
const ReceivedApplicationController = require("../../controllers/ReceivedApplicationController");
const router = express.Router();
const authRequire = require("../../middleware/validateToken")

router.route("/getApplicationByUser/:id").get(ReceivedApplicationController.getReceivedApplicationsByUserId);

module.exports = router;