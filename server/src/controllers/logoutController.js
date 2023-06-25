const { StatusCodes } = require("http-status-codes")
const User = require("../model/User")
const jwt = require('jsonwebtoken')

const handleLogout = async (req, res)=>{
    // On client, also delete the  accessToken

    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(StatusCodes.NO_CONTENT)
    
    const refreshToken = cookies.jwt
    
    // is refreshToken in db?
    const user = await User.findOne({refreshToken}).exec()

    if(!user){
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true} ) 
        return res.sendStatus(StatusCodes.NO_CONTENT)
    }
    //Delete refreshToken in db 
    user.refreshToken = '';

    const result = await user.save()
    console.log(result);
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
    res.sendStatus(StatusCodes.NO_CONTENT)
}



 


async function serializeUser(email) {
    return await User.findOne({email}).select({email, firstName}) 
}
module.exports = {
    handleLogout
}