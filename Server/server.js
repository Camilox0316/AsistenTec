require("dotenv").config();
const express = require("express");
const app = express();
const erorrHandler = require("./middleware/erorrHandler");
const corsOptions = require("./config/corsOptions");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRequire = require("./middleware/validateToken");
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: true }));

// built-in middleware for json
app.use(express.json());

//built-in middleware to parse cookies
app.use(cookieParser());

//serve static classSingleton

//routers

app.use("/login", require("./routes/api/userRouter"));
//app.use(verifyJWT)

app.use("/user", require("./routes/api/userRouter"));
//app.use('/utilities', require('./routes/api/utilitiesRouter'));

//custom middleware of error handling
app.use(erorrHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//nuevo objeto jason usario apellido
