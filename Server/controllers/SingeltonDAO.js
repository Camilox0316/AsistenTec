const SingletonConnexion = require("./SingeltonConnexion.js");

//Models
const User = require("../models/User");
// const Student = require('../models/Student');
const Assistance = require("../models/Assistance");
// const Professor = require('../models/Professor');
// const Assistant = require('../models/Assistant');
// const Team = require('../models/Team.js');
// const ActivitiesPlan = require('../models/ActivitiesPlan.js');
// const Activity = require('../models/Activity.js');
// const Branch = require('../models/Branch.js');
// const ActivityType = require('../models/activityType');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const erorrHandler = require("../middleware/erorrHandler");
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

  //-------------------------------------------------------------------------------------
  //                      Assistences Functions
  //-------------------------------------------------------------------------------------

  // Obtener todas las asistencias
  async getAllAssistances() {
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
}

const singletonDAO = SingletonDAO.getInstance();

module.exports = singletonDAO;
