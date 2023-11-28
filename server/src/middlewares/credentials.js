const allowOrigin = [
    'http://127.0.0.1:3000',
    'http://localhost:5174',
    "http://localhost:5173"
]


const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if(allowOrigin.includes(origin)){
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}

module.exports = credentials