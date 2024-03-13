const mongoose = require('mongoose');

async function dbConnect() {
    // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
    mongoose
      .connect(
          process.env.DB_URL,
        {
          //   these are options to ensure that the connection is done properly
          useNewUrlParser: true, 
          useUnifiedTopology: true 
        }
      )
      .then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
      })
      .catch((error) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
  
      });
  }

// fution to disconnect from the database
async function dbDisconnect() {
    mongoose.connection.close()
    //mongoose.disconnect();
    console.log("Disconnected from MongoDB Atlas!");
}
module.exports = {dbConnect, dbDisconnect};