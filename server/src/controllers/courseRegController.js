const { StatusCodes } = require('http-status-codes')
const CourseReg = require('../model/CourseReg')
const User = require('../model/User')

const registerCourse = async(req, res)=>{
    const matricNo = req.user.matricNo 
    const {course, semester, period, level} = req.body
    try {
        const duplicateRegisteredCourse = await CourseReg.findOne({course})

        // check for duplicate of registered course
        if(duplicateRegisteredCourse) return res.status(StatusCodes.CONFLICT).json(`course with this ${course} already exist`)
        
        // register new course
        const registeredCourse = await CourseReg.create({
            course,
            semester,
            period,
            level,
            createdBy: matricNo
        })
    
        // find user and push registered course to the user model
        const updatedUser = await User.findOneAndUpdate(
            { matricNo: matricNo },
            { $push: { registeredCourses: registeredCourse._id } },
            { new: true }
        );
        console.log(updatedUser);
        
        res.status(StatusCodes.CREATED).json(registeredCourse)
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')  
    }    
}

const getRegisteredCourses = async(req, res)=>{
    // const {} = req.query
    const studentId = req.user.matricNo
    try {
        const registeredCourses = await User.find({matricNo: studentId}).select("registeredCourses").populate("registeredCourses")

        // check for any existing Registered Courses
        if(!registeredCourses) return res.status(StatusCodes.NOT_FOUND).json("no registered courses found")

        // return registered courses
        res.status(StatusCodes.OK).json(registeredCourses)
        
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something went wrong ")
    }
}

const getRegisteredCourse = async(req, res)=>{
    // get id from request parameter
    const id = req.params.id
    try {
        
        // get single registered course
        const singleRegisteredCourse = await CourseReg.findOne({_id: id})
        
        // check if id exist
        if(!singleRegisteredCourse) return res.status(StatusCodes.NOT_FOUND).json(`No registered course with this ${id}`)
        
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