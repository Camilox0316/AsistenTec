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

router
  .route("/getAssistanceStatus/:courseCode/:userId")
  .get(ReceivedApplicationController.getAssistanceStatus);

router.route("/removeApplication/:courseCode/:userId").delete(ReceivedApplicationController.removeApplication);

router.route("/getStudentAssistances/:userId").get(ReceivedApplicationController.getStudentAssistances);

module.exports = router;
