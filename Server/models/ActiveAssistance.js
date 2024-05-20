const ActiveAssistanceSchema = new mongoose.Schema({
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
    score: {
      type: Number,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    }
});

const ActiveAssistance = mongoose.model('ActiveAssistance', ActiveAssistanceSchema);
module.exports = ActiveAssistance
