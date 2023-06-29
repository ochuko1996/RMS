const { StatusCodes } = require("http-status-codes")
const User = require("../model/User")
const jwt = require('jsonwebtoken')

const refreshTokenController = async (req, res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(StatusCodes.UNAUTHORIZED)

    const refreshToken = cookies.jwt
    
    // is refreshToken in db?
    const user = await User.findOne({refreshToken}).exec()

    if(!user) return res.sendStatus(StatusCodes.UNAUTHORIZED)

    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err || user.email !== decoded.email) return res.sendStatus(StatusCodes.FORBIDDEN)
            
            const roles = Object.values(user.roles)
            const accessToken = jwt.sign(
                {
                    "UserRole": roles,
                    "UserInfo": serializeUser(user)
                }, 
                process.env.ACCESS_TOKEN_SECRET, 
                {expiresIn: '15m'}
            )
            res.json({accessToken})
            
        }
    )
}  
function serializeUser(user) {
    return {
        _id: user?._id,
        email: user?.email,
        matricNo: user?.matricNo,
        firstName: user?.firstName
    } 
}
module.exports = refreshTokenController