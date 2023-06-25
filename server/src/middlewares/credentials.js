// const allowedOrigins = require('../config/allowOrigin')
const allowOrigin = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
]


const credentials = (req, res, next) => {
    const origin = req.headers.origin;

    if(allowOrigin.includes(origin)){
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}

module.exports = credentials