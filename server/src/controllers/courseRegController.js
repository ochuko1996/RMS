const { StatusCodes } = require('http-status-codes')
const CourseReg = require('../model/CourseReg')
const User = require('../model/User')

const registerCourse = async(req, res)=>{
    const id = req.user._id 
    const {course, semester, period, level, department} = req.body
    try {
        const duplicateRegisteredCourse = await CourseReg.findOne({course})
        if(duplicateRegisteredCourse) return res.status(StatusCodes.CONFLICT).json(`course with this ${course} already exist`)
        
        // register new course
        const registedCourse = await CourseReg.create({
            course,
            semester,
            period,
            level,
            department,
            createdBy: id
        })
        // find user and add registered course to the user model
        const User = await findOne({_id: id})
        User.registeredCourse.push(course)
        await User.save()
        
        res.status(StatusCodes.CREATED).json(registedCourse)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)  
    }    
}

const getRegisteredCourses = async(req, res)=>{
    // const {} = req.query
    try {
        const registeredCourses = await CourseReg.find()

        // check for any existing Registered Courses
        if(!registeredCourses) return res.status(StatusCodes.NOT_FOUND).json("no registered courses found")

        // return registered courses
        res.status(StatusCodes.OK).json(registeredCourses)
        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json("Something went wrong ")
    }
}

const getRegisteredCourse = async(req, res)=>{
    // get id from request parameter
    const id = req.params.id
    try {
        // check if id exist
        if(!id) return res.status(StatusCodes.NOT_FOUND).json(`No registered course with this ${id}`)
        
        // get single registered course
        const singleRegisteredCourse = await CourseReg.findOne({_id: id})
        
        res.status(StatusCodes.OK).json(singleRegisteredCourse)        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json("Something went wrong ")
    }
}
const deleteRegisteredCourse = async(req, res)=>{
    // get id from request parameter
    const id = req.params.id
    try {
        // check if id exist
        if(!id) return res.status(StatusCodes.NOT_FOUND).json(`No registered course with this ${id}`)
        
        // delete registered course
        await CourseReg.findOneAndDelete({_id: id})
        
        res.sendStatus(StatusCodes.NO_CONTENT)        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json("Something went wrong ")
    }
}

const updateRegisteredCourse = async(req, res)=>{
    // get id from request parameter
    const id = req.params.id
    try {
        // check if id exist
        if(!id) return res.status(StatusCodes.NOT_FOUND).json(`No registered course with this ${id}`)
        
        // update registered course
        const updatedRegisterCourse = await CourseReg.findOneAndUpdate(
            {_id: id},
            {$set: req.body},
            {returnOriginal: false}
        )
        
        res.status(StatusCodes.OK).json(updatedRegisterCourse)        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json("Something went wrong ")
    }
}

module.exports = {
    registerCourse,
    getRegisteredCourses,
    updateRegisteredCourse,
    deleteRegisteredCourse,
    getRegisteredCourse
}