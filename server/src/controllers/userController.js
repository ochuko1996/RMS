const { StatusCodes } = require("http-status-codes")
const User = require("../model/User")

const getUsers = async(req, res)=>{
     const {department, semester, period, level, schoolSession} = req.query
    const queryObject = {}
    if (department) {
        queryObject.department = department
    }
    if (semester) {
        queryObject.semester = semester
    }
    if (period) {
        queryObject.period = period
    }
    if (level) {
        queryObject.level = level
    }
    if (schoolSession) {
        queryObject.schoolSession = schoolSession
    }
    const user = await User.find(queryObject).populate("department")
    res.status(StatusCodes.OK).json(user)
}
const getUser = async(req, res)=>{
    const id = req.params.id
    try {
        const user = await User.findOne({_id: id})
        // check if user Id exist
        if(!user) return res.status(StatusCodes.NOT_FOUND).json(`user with id: ${id} not found`)
        
        res.status(StatusCodes.OK).json({user: user})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
    }
    
}
const deleteUser = async(req, res)=>{
    const id = req.params.id
    try {
        const user = await User.findOneAndDelete({_id: id})
        // check if user ID exsit
        if(!user) return res.status(StatusCodes.NOT_FOUND).json(`user with id: ${id} not found`)
        res.status(StatusCodes.NO_CONTENT)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(`Something went wrong`)
    }
}

const updateUser = async(req, res)=>{
    const id = req.params.id
    try {
        const user = await User.findOneAndUpdate(
            {_id: id}, 
            {$set: req.body},
            {returnOriginal: false}
        )
        res.status(StatusCodes.OK).json({user: user})
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json(`user with id: ${id} not found`)
    }

}


module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser
}