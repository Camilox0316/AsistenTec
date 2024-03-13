const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error: ', err);
    }
};

const dbDisconnect = async () => {
    try {
        await mongoose.connection.close();
        console.log('Database disconnected successfully');
    } catch (err) {
        console.error('Database disconnection error: ', err);
    }
};

module.exports = {
    dbConnect,
    dbDisconnect
};