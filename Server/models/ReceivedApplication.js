const mongoose = require('mongoose');

const ReceivedApplicationSchema = new mongoose.Schema({
    idAssistance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assistance',
      required: true
    },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    idApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    selected: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    }
});

const ReceivedApplication = mongoose.model('ReceivedApplication', ReceivedApplicationSchema);
module.exports = ReceivedApplication