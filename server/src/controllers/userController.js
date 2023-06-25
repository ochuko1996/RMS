const { StatusCodes } = require("http-status-codes")
const User = require("../model/User")

const getUsers = async(req, res)=>{
    const user = await User.find().exec()

    res.status(StatusCodes.OK).json({user: user})
}
const getUser = async(req, res)=>{
    const id = req.params.id
    try {
        const user = await User.findOne({_id: id})
        res.status(StatusCodes.OK).json({user: user})
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json(`user with id: ${id} not found`)
    }
    
}
const deleteUser = async(req, res)=>{
    const id = req.params.id
    try {
        const user = await User.findOneAndDelete({_id: id})
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