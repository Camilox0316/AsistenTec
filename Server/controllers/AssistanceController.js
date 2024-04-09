const SingletonDAO = require("../controllers/SingletonDAO");
const Assistance = require("../models/Assistance");

class AssistanceController {
  static async getAll(req, res) {
    try {
      const assistances = await SingletonDAO.getAll();
      res.json(assistances); // Maneja la respuesta HTTP aquí
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async getAssistancesByProfessorId(req, res) {
    try {
      const professorId = req.params.id; // Asume que el ID del profesor viene como parámetro en la URL
      const assistances = await SingletonDAO.getAllAssistancesByProfessorId(
        professorId
      );

      res.json(assistances);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async addAssistance(req, res) {
    try {
      let {
        professorId,
        school,
        assistanceType,
        year,
        semester,
        name,
        courseDescription,
        hours,
        groupNumber,
      } = req.body;

      // Asegurarse de que los campos que deben ser en minúscula lo estén
      school = school.toLowerCase();
      assistanceType = assistanceType.toLowerCase();

      // Crear el objeto de asistencia con valores predeterminados para algunos campos
      const assistanceData = {
        professorId,
        school,
        assistanceType,
        year,
        semester,
        name,
        courseDescription,
        // Establecer valores predeterminados
        adminStatus: "pendiente",
        studentStatus: "pendiente",
        isEditable: true, // Suponiendo que quieres que por defecto sean editables
        hours,
        groupNumber,
        isActive: true, // Suponiendo que quieres que por defecto estén activas
      };

      // Llamada al método de tu SingletonDAO
      const newAssistance = await SingletonDAO.addAssistance(assistanceData);

      // Devolver la respuesta
      res.status(201).json({
        message: "Assistance added successfully",
        assistance: newAssistance,
      });
    } catch (error) {
      console.error("Error adding assistance:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  static async updateAssistance(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const updatedAssistance = await SingletonDAO.updateAssistance(
        id,
        updateData
      );
      res.json({
        message: "Assistance updated successfully",
        updatedAssistance,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteAssistance(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Invalid request." });
    }

    try {
      await SingletonDAO.deleteAssistance(id);
      res.send({ message: "Assistance deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: "Server error", error });
    }
  }

  static async getAllAssistances(req, res) {
    try {
      const assistances = await SingletonDAO.getAllAssistances();
      res.json(assistances); // Send the response here
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  static async getAllTutorship(req, res) {
    try {
      const assistances = await SingletonDAO.getAllTutorship(req, res);
      res.json(assistances);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAssistanceById(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Invalid request." });
    }
    try {
      const assistance = await SingletonDAO.getAssistanceById(id);
      res.json(assistance);
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAssistanceByIdObject(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Invalid request." });
    }
    try {
      const assistances = await SingletonDAO.getAssistanceByIdObject(id);
      res.json(assistances);
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}


module.exports = AssistanceController;
