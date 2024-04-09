const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assistanceSchema = new mongoose.Schema(
  {
    proffesorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    assistanceType: {
      type: String,
      required: true,
      enum: [
        "horas estudiante",
        "asistencia especial",
        "horas asistente",
        "tutoría",
      ],
    },
    year: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      enum: [1, 2], // Only allow 1 or 2 for the semester
    },
    name: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    adminStatus: {
      type: String,
      required: true,
      enum: ["pendiente", "aceptado", "rechazado"], // Example of possible statuses
      default: "pendiente",
    },
    studentStatus: {
      type: String,
      required: true,
      enum: ["pendiente", "aceptado", "rechazado"], // Example of possible statuses
      default: "pendiente", // Valor predeterminado
    },
    isEditable: {
      type: Boolean,
      default: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    groupNumber: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Adds `createdAt` and `updatedAt` fields automatically

const Assistance = mongoose.model("Assistance", assistanceSchema);

module.exports = Assistance;
