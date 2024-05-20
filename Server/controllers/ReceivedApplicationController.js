const SingletonDAO = require("./SingletonDAO");
const ReceivedApplication = require("../models/ReceivedApplication");

class ReceivedApplicationController {
  static async createReceivedApplication(req, res) {
    try {
      const newReceivedApplication = await SingletonDAO.addReceivedApplication(
        req.body
      );
      res.status(201).json(newReceivedApplication);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async listReceivedApplications(req, res) {
    try {
      const receivedApplications =
        await SingletonDAO.getAllReceivedApplications();
      res.status(200).json(receivedApplications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getReceivedApplication(req, res) {
    try {
      const receivedApplicationId = req.params.id;
      const receivedApplication = await SingletonDAO.getReceivedApplicationById(
        receivedApplicationId
      );
      res.status(200).json(receivedApplication);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async updateReceivedApplication(req, res) {
    try {
      const receivedApplicationId = req.params.id;
      const updateData = req.body;
      const updatedReceivedApplication =
        await SingletonDAO.updateReceivedApplication(
          receivedApplicationId,
          updateData
        );
      res.status(200).json(updatedReceivedApplication);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteReceivedApplication(req, res) {
    try {
      const receivedApplicationId = req.params.id;
      await SingletonDAO.deleteReceivedApplication(receivedApplicationId);
      res
        .status(200)
        .json({ message: "ReceivedApplication deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getReceivedApplicationsByUserId(req, res) {
    try {
      const userId = req.params.id;
      const receivedApplications =
        await SingletonDAO.getReceivedApplicationsByUserId(userId);
      res.status(200).json(receivedApplications);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async getReceivedApplicationsByAssistanceId(req, res) {
    try {
      const assistanceId = req.params.assistanceId; // Asegúrate de que el parámetro es el correcto
      const receivedApplications =
        await SingletonDAO.getReceivedApplicationsByAssistanceId(assistanceId);
      res.status(200).json(receivedApplications);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async getAssistanceStatus (req, res, next) {
    const { courseCode, userId } = req.params;
  
    try {
      const hasApplied = await SingletonDAO.checkIfStudentApplied(courseCode, userId);
      return res.json({ hasApplied });
    } catch (error) {
      console.error("Error checking assistance status:", error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  static async removeApplication(req, res, next) {
    try {
      const { courseCode, userId } = req.params;
      const result = await SingletonDAO.removeApplication(courseCode, userId);
      if (result) {
        return res.status(200).json({ message: 'Application removed successfully' });
      } else {
        return res.status(404).json({ message: 'Application not found' });
      }
    } catch (error) {
      console.error("Error removing application:", error.message);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  static async  getStudentAssistances (req, res, next) {
    try {
      const { userId } = req.params;
      const assistances = await SingletonDAO.getStudentAssistances(userId);
      return res.status(200).json(assistances);
    } catch (error) {
      console.error("Error fetching student assistances:", error.message);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
}
module.exports = ReceivedApplicationController;
