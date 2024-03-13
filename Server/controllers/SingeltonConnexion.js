const DB = require('../config/dbConn.js');

class SingletonConnexion {
    constructor() {
        console.log('SingletonConnexion constructor called');
        this.dbConnection();
    }

    async dbConnection() {
        console.log('SingletonConnexion dbConnection called');
        await DB.dbConnect();
    }

    async dbDisconnect() {
        await DB.dbDisconnect();
    }
}

let instance = null;

const getInstance = () => {
    if (!instance) {
        instance = new SingletonConnexion();
    }
    return instance;
};

module.exports = { getInstance };