//Cross Origin Resource Sharing
const whiteList = ['http://localhost:5173', 'http://localhost:3500']
const corsOptions = {
    origin: (origin, callback) =>{
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }, 
    optionsSuccessStatus: 200
}

module.exports = corsOptions;