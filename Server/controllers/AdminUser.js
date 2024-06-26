const SingletonDAO = require("../controllers/SingeltonDAO");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  await SingletonDAO.loginUser(req, res, next);
};

const registerUser = async (req, res, next) => {
  const { email, password, firstName, lastName1, lastName2, carnet } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  //check for duplicate usernames in the db
  const duplicate = await User.findOne({ email: email }).exec();

  if (duplicate) {
    console.log("duplicado");
    return res.status(400).json({ msg: "User already exists" });
  }

  try {
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y almacenar el nuevo usuario
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      name: firstName,
      carnet: carnet,
      lastName1: lastName1,
      lastName2: lastName2,
      photo: req.file ? `/uploads/profilePhotos/${req.file.filename}` : "",
      roles: 1597,
    });

    res.status(200).json({ msg: "User created", userId: newUser._id });
  } catch (e) {
    res.status(500).json({ msg: "Server error" + e });
  }
  next();
};

/*
async registerUser(req, res, next) {
    const { email, password, name, phone } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    //check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email }).exec();

    if (duplicate) {
      return res.status(400).json({ msg: "User already exists" });
    }

    try {
      //encrypt password
      const hashedPassword = await bcrypt.hash(password, 10);
      // creating the user
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        phone,
      });
      // saving the user in the database
      const userSaved = await newUser.save();

      const token = await createAccessToken({ id: userSaved._id });

      console.log("Token generado:", token);
      res.cookie("token", token);

      res.status(200).json({ roles:['client'],userSaved, msg: "User created" });
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  }
*/

const updatePassword = async (req, res, next) => {
  try {
    const jsonBody = req.body;

    if (
      !jsonBody.usuario ||
      !jsonBody.newPassword ||
      !jsonBody.confirmPassword
    ) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    if (jsonBody.newPassword !== jsonBody.confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    const userToUpdate = await User.findOne({ email: jsonBody.usuario });

    if (!userToUpdate) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const hashedPassword = await bcrypt.hash(jsonBody.newPassword, 10);

    await User.updateOne(
      { email: jsonBody.usuario },
      { password: hashedPassword }
    );

    res.status(200).json({ msg: "Password updated" });
  } catch (e) {
    res.status(500).json({ msg: "Server error" + e });
  }
};

//logout
const logout = async (req, res, next) => {
  await SingletonDAO.logout(req, res, next);
};

const profile = async (req, res, next) => {
  await SingletonDAO.profile(req, res, next);
};
const verifyToken = async (req, res, next) => {
  await SingletonDAO.verifyToken(req, res, next);
};

module.exports = {
  loginUser,
  registerUser,
  updatePassword,
  verifyToken,
  profile,
  logout,
};
