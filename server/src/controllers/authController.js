const { StatusCodes } = require("http-status-codes")
const User = require("../model/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res)=>{
    const {email, firstName, lastName, password, matricNo, department} = req.body
   
    // searching the database for user
    const user = await User.findOne({email})

    // find matric no
    const checkMatricNo = await User.findOne({matricNo: matricNo})
    if (typeof(checkMatricNo.matricNo)) {
       return; 
    } else if (checkMatricNo) return res.status(StatusCodes.CONFLICT).json(`user with Matric No: ${checkMatricNo} already exist`)
    
    // check for existing user
    if(user) return res.status(StatusCodes.CONFLICT).json("user already exist")

    // encrypt user password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // create and store new user
    const newUser = await User.create({
        matricNo: matricNo ? parseInt(matricNo) : null,
        email,
        firstName,
        lastName,
        roles: {"student": 1000},
        password: hashedPassword,
        department: department ? department : null
    })
    res.status(StatusCodes.CREATED).json({user: newUser})
}

const login = async (req, res)=>{
    const {email, password} = req.body
    // find user
    const user = await User.findOne({email})

    //COMPARE PAYLOAD PASSWORD WITH HASHED PASSWORD
    const comparePwd = bcrypt.compare(password, user.password)
    
    // check if user exist
    if(user){
        if (comparePwd){
            const roles = Object.values(user.roles).filter(Boolean)
            // create a token, in production ACCESS_TOKEN SHOULD BE 5MIN OR MORE
            const accessToken = jwt.sign(
                {
                    "UserRole": roles,
                    "UserInfo": serializeUser(user)
                }, 
                process.env.ACCESS_TOKEN_SECRET, 
                {expiresIn: '1d'}
            )
            
            const refreshToken = jwt.sign(serializeUser(user), process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
            
            user.refreshToken = refreshToken;
            const result = await user.save()
            res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None',  maxAge: 24 * 60 * 60 * 1000})//secure: true
            return res.status(StatusCodes.ACCEPTED).json({user: {
                accessToken,
                user: serializeUser(user),
                roles
            }})
        }
    } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something went wrong")
    }
}






function serializeUser(user) {
    return {
        _id: user?._id,
        email: user?.email,
        firstName: user?.firstName,
        matricNo: user?.matricNo,
    }
}
module.exports = {
    login,
    register,
}