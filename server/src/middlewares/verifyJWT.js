const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const verifyJWT =  (req, res, next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization
    
    if(!authHeader) return res.sendStatus(StatusCodes.UNAUTHORIZED)
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded)=> {
            console.log(err);
            if(err) return res.sendStatus(StatusCodes.FORBIDDEN)
            req.user = decoded.UserInfo
            req.roles = decoded.UserRole 
            next()
        }
    )
}

module.exports = verifyJWT