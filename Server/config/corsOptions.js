// File: ./config/corsOptions.js
require("dotenv").config();
const URL_FRONTED = process.env.URL_FRONTED;

module.exports = {
    origin: `${URL_FRONTED}`, // Replace with your frontend application’s URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  };