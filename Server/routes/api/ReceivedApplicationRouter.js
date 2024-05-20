const express = require("express");
const ReceivedApplicationController = require("../../controllers/ReceivedApplicationController");
const router = express.Router();
const authRequire = require("../../middleware/validateToken");

router
  .route("/getApplicationByUser/:id")
  .get(ReceivedApplicationController.getReceivedApplicationsByUserId);

router.get(
  "/receivedApplications/:assistanceId",
  ReceivedApplicationController.getReceivedApplicationsByAssistanceId
);

router
  .route("/updateReceivedApplication/:id")
  .patch(ReceivedApplicationController.updateReceivedApplication);

module.exports = router;
