const express = require("express");
const router = express.Router();
const AssistanceController = require("../../controllers/AssistanceController");
const { authRequire } = require("../../middleware/validateToken");

// Obtener todas las asistencias
router.route("/getAssistances").get(AssistanceController.getAll);

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

// Obtener todas las asistencias
router.route("/getAllAssistances").get(AssistanceController.getAllAssistances);

//Obtener todas las tutorias
router.route("/getTutoring").get(AssistanceController.getAllTutorship);

router.route("/getAssistanceById/:id").get(AssistanceController.getAssistanceById);

router.route("/getAssistanceByIdObject/:id").get(AssistanceController.getAssistanceByIdObject);

module.exports = router;
