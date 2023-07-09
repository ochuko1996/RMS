const Course = require("../model/Course")
const {StatusCodes} = require('http-status-codes')


const createCourse = async (req, res)=>{
    const {name, code} = req.body
    
    const course = await Course.create({
        name,
        code,
        createdBy: req.user.id
    })
    res.status(StatusCodes.CREATED).json(course)
}

const getCourses = async (req, res)=>{
    try {
        // find all courses in DB
        const courses = await Course.find()
        // check if any course is existing in the DB
        if(!courses) return res.status(StatusCodes.NOT_FOUND).json("Something went wrong, No course found")
        // if course is true then return courses
        res.status(StatusCodes.OK).json(courses)
        
    } catch (error) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const getCourse = async (req, res)=>{
    // get id from request parameter
    const id = req.params.id
    try {
       // find single course from the DB
        const singleCourse = await Course.findOne({_id: id})
        //check if there's any course with this id
        if(!singleCourse) return res.status(StatusCodes.NOT_FOUND).json(`No course with ID: ${id} found`)
        
        // if course is found then return a single with the id received
        res.status(StatusCodes.OK).json(singleCourse)
        
    } catch (error) {   
        return res.sendStatus(StatusCodes.BAD_REQUEST)
        
    }
}

const deleteCourse = async (req, res)=>{
    // get id from request parameter
    const id = req.params.id
    try {
        // check if id exist
        if(!id) return res.status(StatusCodes.NOT_FOUND).json(`No registered course with this ${id}`)
        // delete course from DB
        await Course.findOneAndDelete({_id: id})
        
        res.sendStatus(StatusCodes.NO_CONTENT)
        
    } catch (error) {   
        res.status(StatusCodes.BAD_REQUEST).json(`Something went wrong` )
    }
}

const updateCourse = async (req, res)=>{
    // get id from request parameter
    const id = req.params.id
    try {
        // check if id exist
        if(!id) return res.status(StatusCodes.NOT_FOUND).json(`No registered course with this ${id}`)
        // update course from DB
        const updatedCourse = await Course.findOneAndUpdate(
            {_id: id},
            {$set: req.body},
            {returnOriginal: false}
        )
        res.status(StatusCodes.OK).json(updatedCourse)
    } catch (error) {   
        res.status(StatusCodes.NOT_FOUND).json(`No course with ID: ${id} found to be updated` )
    }
}

module.exports = {
    createCourse, 
    getCourse,
    deleteCourse, 
    updateCourse,
    getCourses
}