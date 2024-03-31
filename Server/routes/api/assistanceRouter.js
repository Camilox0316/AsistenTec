const express = require("express");
const router = express.Router();
const AssistanceController = require("../../controllers/AssistanceController");
const { authRequire } = require("../../middleware/validateToken");

// Obtener todas las asistencias
router.route("/getAssistances").get(AssistanceController.getAllAssistances);

// Agregar una nueva asistencia
router.route("/addAssistance").post(AssistanceController.addAssistance);

// Actualizar una asistencia existente
router
  .route("/updateAssistance/:id")
  .put(AssistanceController.updateAssistance);

// Obtener asistencias por id de profesor
router
  .route("/getProfAssistances/:id")
  .get(AssistanceController.getAssistancesByProfessorId);

// Eliminar una asistencia
router
  .route("/deleteAssistance/:id")
  .delete(AssistanceController.deleteAssistance);
module.exports = router;
