const CourseReg = require('../model/CourseReg')
const assessment = require('../model/assessment')
const getGrade = require('../utils/gradeFunc')

const addAssessment = async (req, res)=>{
    const id = req.params.id
    const {classWork, exam} = req.body
    const sum = classWork + exam
    const courseRegUnit = await CourseReg.findOne({_id: id}).select("courseUnit -semester -level -time -createdBy")
    
    // const newAssessment = await assessment.create({
    //     classWork,
    //     exam,
    //     total: sum,
    //     point: getGrade(sum)
    //     gpa: 

    // })
    // res.json(courseRegUnit)
    console.log(courseRegUnit);
}

const getAssessments = async (req, res)=>{
    const assessments = await assessment.find()
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