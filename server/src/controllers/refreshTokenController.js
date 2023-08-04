const { StatusCodes } = require("http-status-codes")
const User = require("../model/User")
const jwt = require('jsonwebtoken')

const refreshTokenController = async (req, res)=>{
    const cookies = req.cookies;
    // console.log(cookies);
    if(!cookies?.jwt) return res.status(StatusCodes.UNAUTHORIZED).json('no cookies with jwt')

    const refreshToken = cookies.jwt
    // console.log("server refresh token", `/n ${refreshToken}`);
    // is refreshToken in db?
    const user = await User.findOne({refreshToken}).exec()

    if(!user) return res.status(StatusCodes.UNAUTHORIZED).json('no user login')

    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err || user.email !== decoded.UserInfo.email) return res.sendStatus(StatusCodes.FORBIDDEN)
            
            const roles = Object.values(user.roles)
            const accessToken = jwt.sign(
                {
                    "UserRole": roles,
                    "UserInfo": serializeUser(user)
                }, 
                process.env.ACCESS_TOKEN_SECRET, 
                {expiresIn: '10s'}
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