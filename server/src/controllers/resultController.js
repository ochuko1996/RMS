const { StatusCodes } = require("http-status-codes");
const Assessment = require("../model/assessment");
const { gpa } = require("../utils/gpa");
const CGPA = require("../utils/cgpa");
const { getCgpa } = require("../utils/gradeFunc");

const getResult = async (req, res) => {
  const matricNo = req.user.matricNo;
  try {
    console.log(matricNo);
    const fetchResult = await Assessment.find({ matricNo }).populate({
      path: "registeredCourse",
      populate: {
        path: "course",
        model: "Courses",
      },
    });

    const semesters = ["one", "two", "three", "four", "five", "six"];
    const result = [];
    let cgpaPoints = [];
    let cgpaUnits = [];

    semesters.forEach((semester) => {
      const semesterData = fetchResult.filter(
        (obj) => obj.registeredCourse.semester === semester
      );
      const points = semesterData.map((data) => data.point);
      const courseUnits = semesterData.map(
        (obj) => obj.registeredCourse.course.unit
      );
      const GPA = gpa(points, courseUnits).toFixed(2);

      result.push({
        [`semester${semester.replace(/^\w/, (c) => c.toUpperCase())}`]:
          semesterData,
        [`GPA_${semester.replace(/^\w/, (c) => c.toUpperCase())}`]: GPA,
      });

      // Accumulate points and units for CGPA calculation
      cgpaPoints = cgpaPoints.concat(points);
      cgpaUnits = cgpaUnits.concat(courseUnits);
    });

    // Calculate CGPA
    const cgpa = CGPA(cgpaPoints, cgpaUnits).toFixed(2);
    console.log(result);
    res.status(StatusCodes.OK).json({
      result,
      grade: {
        cgpa,
        grade: getCgpa(cgpa),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something went wrong");
  }
};

const getResults = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const fetchResult = await Assessment.find().populate({
      path: "registeredCourse",
      populate: {
        path: "course",
        model: "Courses",
      },
    });
    const semesters = ["one", "two", "three", "four", "five", "six"];
    const result = [];
    let cgpaPoints = [];
    let cgpaUnits = [];
    const filteredResult = searchQuery
      ? fetchResult.filter(
          (obj) => obj.matricNo.toString() === `${searchQuery}`
        )
      : // ? fetchResult.filter(obj => obj.matricNo.includes(searchQuery))
        [];
    // res.json(filteredResult)
    semesters.forEach((semester) => {
      const semesterData = filteredResult.filter(
        (obj) => obj.registeredCourse.semester === semester
      );
      const points = semesterData.map((data) => data.point);
      const courseUnits = semesterData.map(
        (obj) => obj.registeredCourse.course.unit
      );
      const GPA = gpa(points, courseUnits).toFixed(2);

      result.push({
        [`semester${semester.replace(/^\w/, (c) => c.toUpperCase())}`]:
          semesterData,
        [`GPA_${semester.replace(/^\w/, (c) => c.toUpperCase())}`]: GPA,
      });

      // Accumulate points and units for CGPA calculation
      cgpaPoints = cgpaPoints.concat(points);
      cgpaUnits = cgpaUnits.concat(courseUnits);
    });

    // calculate CGPA
    const cgpa = CGPA(cgpaPoints, cgpaUnits).toFixed(2);
    res.status(StatusCodes.OK).json({
      result,
      grade: {
        cgpa,
        grade: getCgpa(cgpa),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong");
  }
};

module.exports = {
  getResult,
  getResults,
};
