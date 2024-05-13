const Assessment = require("../model/assessment"); // Adjust the file path and case sensitivity if necessary
const CourseReg = require("../model/CourseReg");
const { getGrade } = require("../utils/gradeFunc");
const { StatusCodes } = require("http-status-codes");

const addAssessment = async (req, res) => {
  const { classWork, exam, matricNo, registeredCourse } = req.body;
  const sum = parseInt(classWork) + parseInt(exam);
  const grade = getGrade(sum);
  console.log(grade);
  try {
    // Check for duplicate assessment
    const findAssessment = await Assessment.findOne({
      matricNo,
      registeredCourse,
    });
    if (findAssessment) {
      return res.status(StatusCodes.CONFLICT).json("Course already marked");
    }

    // Create new assessment
    const newAssessment = await Assessment.create({
      classWork: parseInt(classWork),
      exam: parseInt(exam),
      total: sum,
      point: grade.point,
      matricNo,
      gradeLetter: grade.gradeLetter,
      registeredCourse,
    });

    return res.status(StatusCodes.CREATED).json(newAssessment);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json("Something went wrong");
  }
};

const getAssessments = async (req, res) => {
  const assessments = await Assessment.find().populate();
  res.json(assessments);
};

const deleteAssessment = async (req, res) => {
  const destroyAssessment = await assessment.findOneAndDelete({
    _id: req.body.id,
  });
  res.json("assessment deleted");
};

module.exports = {
  addAssessment,
  getAssessments,
};
