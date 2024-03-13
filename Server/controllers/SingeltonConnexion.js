const DB = require('../config/dbConn.js');
const dbConn = DB.dbConnect;
const dbDisconn = DB.dbDisconnect;
//Databse singleton
class SingletonConnexion {
    static instance;
    static count = 0;
  
    constructor() {
      //Database connection
      //dbConn();
    }
  
    static getInstance() {
      if (this.instance) {
        console.log("Returning instance");
        return this.instance;
      }
      console.log("creating instance");
      this.instance = new SingletonConnexion();
  
      this.count = this.count + 1;
      return this.instance;
    }

    async dbConnect() {
        // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
        dbConn();
    }

    async dbDisconnect() {
        // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
        dbDisconn();
    }
  }
  
const conn = SingletonConnexion.getInstance();

module.exports = conn;