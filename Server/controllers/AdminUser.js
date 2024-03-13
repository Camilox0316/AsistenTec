const SingletonDAO = require('../controllers/SingeltonDAO')
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }    
    let valueLoggin = await SingletonDAO.loginUser(req, res, next);
    if (valueLoggin == false) {
        console.log("User login failed");
    }else{
        const accessToken = jwt.sign({ "username": email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        const refreshToken = jwt.sign({ "username": email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        const currentUser = {... email, refreshToken}

        //res.status(200).json({ accessToken, currentUser });
    }
    next(); 
}

const registerUser = async (req, res, next) => {
    const jsonBody = req.body;
    
    if (!jsonBody.email || !jsonBody.password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    //check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: jsonBody.email }).exec();

    if (duplicate) {
        return res.status(400).json({ msg: 'User already exists' });
    }

    try {
        //encrypt password

        const hashedPassword = await bcrypt.hash(jsonBody.password, 10);
        
        console.log("jsonBody: ", jsonBody);
        //create and store the new user        
        await User.create({ "email": jsonBody.email, "password": hashedPassword, "name" : jsonBody.firstName,
        "carnet":jsonBody.carnet ,"lastName1":jsonBody.lastName1,"lastName2":jsonBody.lastName2,
        "role": 1597});
        
        res.status(200).json({ msg: 'User created' });
    } catch (e) {
        res.status(500).json({ msg: 'Server error'+ e });
    }
    next();
}

const updatePassword = async (req, res, next) => {
    try{
        const jsonBody = req.body;

        if (!jsonBody.usuario || !jsonBody.newPassword || !jsonBody.confirmPassword) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        if (jsonBody.newPassword !== jsonBody.confirmPassword) {
            return res.status(400).json({ msg: 'Passwords do not match' });
        }

        const userToUpdate = await User.findOne({ email: jsonBody.usuario });
        
        if (!userToUpdate) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        const hashedPassword = await bcrypt.hash(jsonBody.newPassword, 10);

        await User.updateOne({ email: jsonBody.usuario }, { password: hashedPassword });

        res.status(200).json({ msg: 'Password updated' });

    }catch(e){
        res.status(500).json({ msg: 'Server error'+ e });
    }
}



module.exports = {loginUser,registerUser,updatePassword};