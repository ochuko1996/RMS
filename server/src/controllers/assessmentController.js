const CourseReg = require('../model/CourseReg')
const assessment = require('../model/assessment')
const getGrade = require('../utils/gradeFunc')
const {StatusCodes} = require('http-status-codes')
const addAssessment = async (req, res)=>{
    const {classWork, exam} = req.body
    const sum = parseInt(classWork) + parseInt(exam)
    try {

        // if()
        const newAssessment = await assessment.create({
            classWork: parseInt(classWork),
            exam: parseInt(exam),
            total: sum,
            point: getGrade(sum)
    
        })
        res.status(StatusCodes.CREATED).json(newAssessment)
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
    }
}

const getAssessments = async (req, res)=>{
    const assessments = await assessment.find().populate()
    res.json(assessments)
}

const deleteAssessment = async (req, res)=>{
    const destroyAssessment = await assessment.findOneAndDelete({_id: req.body.id})
    res.json("assessment deleted")
}

module.exports = {
    addAssessment, 
    getAssessments
}