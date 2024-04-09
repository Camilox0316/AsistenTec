const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    idAssistance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assistance',
        required: true
      },
      carnet: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      avgLastGrade: {
        type: Number,
        required: true
      },
      hours: {
        type: String,
        required: true
      },
      scholarship: {
        type: String,
        required: true
      },
      bankAccount: {
        type: String,
        required: true
      },
      otherAssistance: {
        type: Boolean,
        required: true
      },
      otherDepartment: {
        type: String,
        required: true
      },
      otherHours: {
        type: Number,
        required: true
      },
      status: {
        type: Boolean,
        required: true
      }
});

const Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application
// Compare this snippet from Server/models/Assistance.js:


