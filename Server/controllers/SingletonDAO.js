const SingletonConnexion = require("./SingeltonConnexion.js");

//Models
const User = require("../models/User.js");
// const Student = require('../models/Student');
const Assistance = require("../models/Assistance.js");
const Application = require("../models/Application.js");
const ReceivedApplication = require("../models/ReceivedApplication.js");
// const Professor = require('../models/Professor');
// const Assistant = require('../models/Assistant');
// const Team = require('../models/Team.js');
// const ActivitiesPlan = require('../models/ActivitiesPlan.js');
// const Activity = require('../models/Activity.js');
// const Branch = require('../models/Branch.js');
// const ActivityType = require('../models/activityType');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const erorrHandler = require("../middleware/erorrHandler.js");
const { createAccessToken } = require("../libs/jwt.js");
const { TOKEN_SECRET } = require("../config/config.js");
const jwt = require("jsonwebtoken");

class SingletonDAO {
  static instance;
  static count = 0;

  constructor() {
    console.log("Singleton constructor called");
    this.conn = SingletonConnexion.getInstance();
  }

  static getInstance() {
    if (this.instance) {
      console.log("Returning instance");
      return this.instance;
    }
    console.log("creating instance");
    this.instance = new SingletonDAO();

    this.count = this.count + 1;
    return this.instance;
  }
  //-------------------------------------------------------------------------------------
  //                      User Admin Functions
  //-------------------------------------------------------------------------------------

  async loginUser(req, res, next) {
    try {
      //check for find the user usernames in the db
      const { email, password } = req.body;
      const userFound = await User.findOne({ email: email }).exec();
      if (!userFound) {
        res
          .status(400)
          .json({ status: false, message: "User has no register" });
        return false;
      }
      if (userFound) {
        const match = await bcrypt.compare(password, userFound.password);

        if (match) {
          const token = await createAccessToken({ id: userFound._id });
          console.log("Token generado:", token);
          res.cookie("token", token);

          res.status(200).json({
            id: userFound._id,
            status: true,
            name: userFound.name,
            photo: userFound.photo,
            roles: [userFound.roles],
            message: "User logged perfectly ",
          });

          return true;
        } else {
          res.status(400).json({ status: false, message: "User not logged" });
          return false;
        }
      }
    } catch {
      res.status(500).json({ status: false, message: "Server error" });
      return false;
    }
  }

  //CREATE  A LOGOUT
  async logout(req, res) {
    res.cookie("token", "", { expires: new Date(0) });
    return res.sendStatus(200);
  }

  // create VerifyToken
  async profile(req, res, next) {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({ msg: "User not found" });
    return res.json({
      id: userFound._id,
      email: userFound.email,
      name: userFound.name,
      carnet: userFound.carnet,
      lastName1: userFound.lastName1,
      lastName2: userFound.lastName2,
      roles: [userFound.roles],
      photo: userFound.photo,
    });
  }
  // create VerifyToken
  async verifyToken(req, res, next) {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ msg: "Unauthorized1" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ msg: "Unauthorized2" });

      const userFound = await User.findById(user.id);
      if (!userFound) return res.status(401).json({ msg: "Unauthorized3" });

      return res.json({
        id: userFound._id,
        email: userFound.email,
        name: userFound.name,
        carnet: userFound.carnet,
        lastName1: userFound.lastName1,
        roles: [userFound.roles],
        lastName2: userFound.lastName2,
        photo: userFound.photo,
      });
    });
  }

  async getUserByRole(req, res, next) {
    try {
      return await User.find({ roles: { $in: [2264, 3123] } });
    } catch (error) {
      throw new Error("Error fetching users by role");
    }
  }
  async getUserByCarnet(carnet) {
    try {
      const userFound = await User.findOne({ carnet: carnet }).exec();
      if (!userFound) {
        return null;
      }
      return userFound;
    } catch (error) {
      console.error("Error finding user by carnet:", error);
      return null;
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findById(userId).exec();
      if (!user) {
        throw new Error("Failed to retrieve user");
      }
      return user;
    } catch (error) {
      console.error("Error retrieving user by ID:", error.message);
      throw error;
    }
  }
  
  //-------------------------------------------------------------------------------------
  //                      Assistences Functions
  //-------------------------------------------------------------------------------------

  // Obtener todas las asistencias
  async getAll() {
    try {
      const assistances = await Assistance.find();
      return assistances; // Simplemente retorna los datos
    } catch (error) {
      throw new Error("Failed to retrieve assistances"); // Lanza un error para manejarlo más arriba
    }
  }
  // Obtener todas las asistencias por ID de profesor
  async getAllAssistancesByProfessorId(proffesorId) {
    try {
      const assistances = await Assistance.find({ proffesorId: proffesorId });
      console.log(assistances); 
      return assistances; // Retorna las asistencias que coinciden con el ID del profesor
    } catch (error) {
      throw new Error(
        "Failed to retrieve assistances for the given professor ID"
      );
    }
  }
  // Agregar una nueva asistencia
  async addAssistance(assistanceData) {
    try {
      // Crear una nueva asistencia con los datos recibidos
      const newAssistance = new Assistance(assistanceData);
      await newAssistance.save();
      return newAssistance;
    } catch (error) {
      throw new Error("Error creating assistance: " + error.message);
    }
  }

  // Actualizar una asistencia existente
  async updateAssistance(assistanceId, updateData) {
    try {
      const updatedAssistance = await Assistance.findByIdAndUpdate(
        assistanceId,
        updateData,
        { new: true }
      );
      if (!updatedAssistance) {
        throw new Error("Assistance not found");
      }
      return updatedAssistance;
    } catch (error) {
      throw new Error(`Failed to update assistance: ${error.message}`);
    }
  }

  // Eliminar una asistencia
  async deleteAssistance(req, res) {
    try {
      const { id } = req.params; // ID de la asistencia a eliminar
      await Assistance.findByIdAndDelete(id);
      res.json({ message: "Assistance deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  async getAllAssistances() {
    try {
      const assistances = await Assistance.find({ assistanceType: { $ne: 'tutoría' } }).exec();
      const assistancesWithProfessorName = await Promise.all(
        assistances.map(async (assistance) => {
          const professorName = assistance.proffesorId
            ? await this.getUserById(assistance.proffesorId)
            : null;
          return {
            ...assistance._doc,
            professorName: professorName
              ? `${professorName.name} ${professorName.lastName1} ${professorName.lastName2}`.trim()
              : null
          };
        })
      );
      return assistancesWithProfessorName;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async getAllTutorship() {
    try {
      const assistances = await Assistance.find({ assistanceType: 'tutoría' }).exec();
      const assistancesWithProfessorName = await Promise.all(
        assistances.map(async (assistance) => {
          const professorName = assistance.proffesorId
            ? await this.getUserById(assistance.proffesorId)
            : null;
          return {
            ...assistance._doc,
            professorName: professorName
              ? `${professorName.name} ${professorName.lastName1} ${professorName.lastName2}`.trim()
              : null
          };
        })
      );
      return assistancesWithProfessorName;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // Adjusted to accept just the `id` rather than `req, res, next`
  async getUserById(userId) {
    try {
      const user = await User.findById(userId, 'name lastName1 lastName2').exec();
      if (!user) {
        throw new Error("Failed to retrieve user");
      }
      return {
        name: user.name,
        lastName1: user.lastName1,
        lastName2: user.lastName2
      };
    } catch (error) {
      console.error("Error retrieving user by ID:", error.message);
      throw error;
    }
  }

  async getAssistanceById(courseCode) {
    try {
      // Find the assistance document by course code
      const assistance = await Assistance.findOne({ courseCode: courseCode }).exec();
      console.log(`find:${assistance}`)
      if (!assistance) {
        throw new Error(`Assistance not found for courseCode: ${courseCode}`);
      }
      // If assistance has a professorId, use getUserById to retrieve professor details
      let assistanceObject = assistance.toObject(); // Convert document to a plain JavaScript object

      if (assistanceObject.proffesorId) {
         const professorDetails = await this.getUserById(assistanceObject.proffesorId);
         assistanceObject.professorName = `${professorDetails.name} ${professorDetails.lastName1} ${professorDetails.lastName2}`.trim();
      }
      
      console.log(assistanceObject);
      return assistanceObject; // Return the modified object
    
    } catch (error) {
      console.error("Error retrieving assistance by ID:", error.message);
      throw error;
    }
  }

  async getAssistanceByIdObject(id) {
    try {
      // Find all assistance documents by ID
      const assistances = await Assistance.find({ _id: id }).exec();
      if (assistances.length === 0) {
        throw new Error(`No assistances found for ID: ${id}`);
      }
      console.log(assistances);
      // Map over the assistances to include professor details
      const assistancesWithProfessorName = await Promise.all(assistances.map(async (assistanceDoc) => {
        let assistanceObject = assistanceDoc.toObject(); // Convert document to a plain JavaScript object
        if (assistanceObject.proffesorId) {
          const professorDetails = await this.getUserById(assistanceObject.proffesorId);
          assistanceObject.professorName = `${professorDetails.name} ${professorDetails.lastName1} ${professorDetails.lastName2}`.trim();
        }
        return assistanceObject;
      }));
  
      console.log(assistancesWithProfessorName);
      return assistancesWithProfessorName; // Return the array of modified objects
    } catch (error) {
      console.error("Error retrieving assistances by ID:", error.message);
      throw error; // It's important to throw the error to let the calling function know something went wrong
    }
  }
  

  
  
  

  // async updateCollection(){
  //   try {
  //     // This will update all documents in the collection
  //     const result = await Assistance.updateMany(
  //       {}, // empty filter, to update all documents
  //       { $set: { "courseCode": "IC-8734" } }, // set the `courseCode` field for all documents
  //       { strict: false } // option to not apply strict mode to the schema
  //     );
  //     console.log(result); // Log the result of the update operation
  //   } catch (error) {
  //     console.error("Error updating collection:", error.message);
  //     throw error; // It's better to throw the error so you can handle it in the calling function
  //   }
  // }

  ///////////////////Application Functions/////////////////////

  // Create a new application
  async addApplication(applicationData) {
    // You need to use await to get the result of the promise
    const userFound = await this.getUserByCarnet(applicationData.carnet);
    
    // Now, you can check if userFound is not null and then access its properties
    if (!userFound) {
      throw new Error(`User not found for carnet: ${applicationData.carnet}`);
    }

    console.log(`DAO: ${userFound._id}`);
    try {
      const application = new Application(applicationData);
      await application.save();
      await this.addReceivedApplication({
        idAssistance: applicationData.idAssistance,
        idUser: userFound._id,
        idApplication: application._id,
        date: new Date(),
        selected: false,
        status: true
      });
      return application;
    } catch (error) {
      throw new Error(`Error creating application: ${error.message}`);
    }
  }

  // Get all applications
  async getAllApplications() {
    try {
      const applications = await Application.find();
      return applications;
    } catch (error) {
      throw new Error(`Error retrieving applications: ${error.message}`);
    }
  }

  // Get an application by ID
  async getApplicationById(applicationId) {
    try {
      const application = await Application.findById(applicationId);
      if (!application) {
        throw new Error(`Application not found with id: ${applicationId}`);
      }
      return application;
    } catch (error) {
      throw new Error(`Error retrieving application: ${error.message}`);
    }
  }

  // Update an application
  async updateApplication(applicationId, updateData) {
    try {
      const application = await Application.findByIdAndUpdate(applicationId, updateData, { new: true });
      return application;
    } catch (error) {
      throw new Error(`Error updating application: ${error.message}`);
    }
  }

  // Delete an application
  async deleteApplication(applicationId) {
    try {
      await Application.findByIdAndDelete(applicationId);
    } catch (error) {
      throw new Error(`Error deleting application: ${error.message}`);
    }
  }

  ///////////////////ReceivedApplication Functions/////////////////////

  // Create a new received application
  async addReceivedApplication(receivedApplicationData) {
    try {
      console.log(`DAO Received: ${receivedApplicationData.idUser}`);
      const receivedApplication = new ReceivedApplication(receivedApplicationData);
      await receivedApplication.save();
      return receivedApplication;
    } catch (error) {
      throw new Error(`Error creating received application: ${error.message}`);
    }
  }

  // Get all received applications
  async getAllReceivedApplications() {
    try {
      const receivedApplications = await ReceivedApplication.find();
      return receivedApplications;
    } catch (error) {
      throw new Error(`Error retrieving received applications: ${error.message}`);
    }
  }

  // Get a received application by ID
  async getReceivedApplicationById(receivedApplicationId) {
    try {
      const receivedApplication = await ReceivedApplication.findById(receivedApplicationId);
      if (!receivedApplication) {
        throw new Error(`Received application not found with id: ${receivedApplicationId}`);
      }
      return receivedApplication;
    } catch (error) {
      throw new Error(`Error retrieving received application: ${error.message}`);
    }
  }

  // Update a received application
  async updateReceivedApplication(receivedApplicationId, updateData) {
    try {
      const receivedApplication = await ReceivedApplication.findByIdAndUpdate(receivedApplicationId, updateData, { new: true });
      return receivedApplication;
    } catch (error) {
      throw new Error(`Error updating received application: ${error.message}`);
    }
  }

  // Delete a received application
  async deleteReceivedApplication(receivedApplicationId) {
    try {
      await ReceivedApplication.findByIdAndDelete(receivedApplicationId);
    } catch (error) {
      throw new Error(`Error deleting received application: ${error.message}`);
    }
  }

  async getReceivedApplicationsByUserId(userId) { 
    try {
      const receivedApplications = await ReceivedApplication.find({ idUser: userId });
      console.log(`DAO Received: ${userId}`);
      return receivedApplications;
    } catch (error) {
      throw new Error(`Error retrieving received applications: ${error.message}`);
    }
  }


};

const singletonDAO = SingletonDAO.getInstance();

module.exports = singletonDAO;
