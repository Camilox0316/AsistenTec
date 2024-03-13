const {logEvents}   = require('./logEvents');
const erorrHandler = (err, req, res, next) => {
    logEvents(`${err.message}: ${err.message}`, 'error.txt');
    console.log(err);
    res.status(500).send('Something broke!');
}


module.exports = erorrHandler;