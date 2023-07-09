const allowOrigin = require('./allowOrigin')
// const allowOrigin = [
//     'http://127.0.0.1:3000',
//     'http://localhost:3000',
// ]


const corsOptions = {
    origin: (origin, callback)=>{
        if (allowOrigin.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions
