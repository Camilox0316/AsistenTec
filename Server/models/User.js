const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: false
    },
    carnet:{
        type: String,
        required: false
    },
    lastName1:{
        type: String,
        required: false
    },
    lastName2:{
        type: String,
        required: false
    },
    photo:{
        type: String,
        required: false
    },
    role: {
        type: Number, 
        required: true,
        default: 1597
         

    }
}, { collection: 'user' });


module.exports = mongoose.model('user', userSchema);