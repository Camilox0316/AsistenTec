const Application = require('../models/Application');
const SingletonDAO = require('./SingletonDAO');

class ApplicationController {

    static async createApplication(req, res) {
      console.log(req.body);
        try {
          // Data validation can go here
          if (!req.body.email.endsWith('@estudiantec.cr')) {
            throw new Error('Invalid email domain');
          }
          
          const newApplication = await SingletonDAO.addApplication(req.body);
          res.status(201).json(newApplication);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }
    
      // List all applications
      static async listApplications(req, res) {
        try {
          const applications = await SingletonDAO.getAllApplications();
          res.status(200).json(applications);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
    
      // Get a single application
      static async getApplication(req, res) {
        try {
          const applicationId = req.params.id;
          const application = await SingletonDAO.getApplicationById(applicationId);
          res.status(200).json(application);
        } catch (error) {
          res.status(404).json({ message: error.message });
        }
      }
    
      // Update an application
      static async updateApplication(req, res) {
        try {
          const applicationId = req.params.id;
          const updateData = req.body;
          const updatedApplication = await SingletonDAO.updateApplication(applicationId, updateData);
          res.status(200).json(updatedApplication);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }
    
      // Delete an application
      static async deleteApplication(req, res) {
        try {
          const applicationId = req.params.id;
          await SingletonDAO.deleteApplication(applicationId);
          res.status(200).json({ message: 'Application deleted successfully' });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }

      // Get all applications by user
      

}
module.exports = ApplicationController;