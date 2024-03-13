const SingletonConnexion = require('./SingeltonConnexion.js');

//Models
const User = require('../models/User');
// const Student = require('../models/Student');
// const Professor = require('../models/Professor');
// const Assistant = require('../models/Assistant');
// const Team = require('../models/Team.js');
// const ActivitiesPlan = require('../models/ActivitiesPlan.js');
// const Activity = require('../models/Activity.js');
// const Branch = require('../models/Branch.js');
// const ActivityType = require('../models/activityType');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const erorrHandler = require('../middleware/erorrHandler');



class SingletonDAO {
    static instance;
    static count = 0;

    constructor() {
        console.log("Singleton constructor called");
        this.conn = SingletonConnexion.getInstance();
    }

    static getInstance() {
        if (this.instance) {
            console.log("Returning instance");
            return this.instance;
        }
        console.log("creating instance");
        this.instance = new SingletonDAO();

        this.count = this.count + 1;
        return this.instance;
    }
    //-------------------------------------------------------------------------------------
    //                      User Admin Functions
    //-------------------------------------------------------------------------------------
 

    async loginUser(req, res, next) {
        try {

            //check for find the user usernames in the db
            const { email, password } = req.body;
            const userFound = await User.findOne({ email: email }).exec();
            if (!userFound) {
                res.status(400).json({ status: false, message: 'User has no register' });
                return false;
            }
            if (userFound) {

                const match = await bcrypt.compare(password, userFound.password);

                if (match) {

                    res.status(200).json({ status: true, roles: [userFound.roles], message: 'User logged perfectly ' });
                    return true;

                } else {
                    res.status(400).json({ status: false, message: 'User not logged' });
                    return false;
                }
            }

        } catch {
            res.status(500).json({ status: false, message: 'Server error' });
            return false;
        }
    }
};

const singletonDAO = SingletonDAO.getInstance();

module.exports = singletonDAO;