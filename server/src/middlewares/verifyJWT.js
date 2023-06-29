const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const verifyJWT =  (req, res, next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization
    
    // if(!authHeader?.startWith('Bearer')) return res.sendStatus(StatusCodes.UNAUTHORIZED)
    if(!authHeader) return res.sendStatus(StatusCodes.UNAUTHORIZED)
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded)=> {
            if(err) return res.sendStatus(StatusCodes.FORBIDDEN)
            req.user = decoded.UserInfo

            console.log(req.user);
            req.roles = decoded.UserRole.roles
            next()
        }
    )
}

module.exports = verifyJWT