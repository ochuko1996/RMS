const { StatusCodes } = require("http-status-codes");
const Assessment = require("../model/assessment");
const { gpa } = require("../utils/gpa");
const CGPA = require("../utils/cgpa");

// const getResult = async (req, res)=>{
//     const matricNo = req.user.matricNo
//     try {
//         console.log(matricNo);
//         const fetchResult = await Assessment.find({matricNo: matricNo}).populate({
//             path: 'registeredCourse',
//             populate: {
//                 path:"course",
//                 model: "Courses"
//             }
//         })
//         const semesterOne = fetchResult.filter(obj => obj.registeredCourse.semester === "one")
//         const semesterTwo = fetchResult.filter(obj => obj.registeredCourse.semester === "two")
//         const semesterThree = fetchResult.filter(obj => obj.registeredCourse.semester === "three")
//         const semesterFour = fetchResult.filter(obj => obj.registeredCourse.semester === "four")
//         const semesterFive = fetchResult.filter(obj => obj.registeredCourse.semester === "five")
//         const semesterSix = fetchResult.filter(obj => obj.registeredCourse.semester === "six")

//         // SEMESTER ONE
//         const pointsOne = semesterOne.map(data => data.point)
//         const courseUnitOne = semesterOne.map(obj => obj.registeredCourse.course.unit)
//         const GPA_One = gpa(pointsOne, courseUnitOne).toFixed(2)
//         // SEMESTER TWO
//         const pointsTwo = semesterTwo.map(data => data.point)
//         const courseUnitTwo = semesterTwo.map(obj => obj.registeredCourse.course.unit)
//         const GPA_Two = gpa(pointsTwo, courseUnitTwo).toFixed(2)
//         // SEMESTER THREE
//         const pointsThree = semesterThree.map(data => data.point)
//         const courseUnitThree = semesterThree.map(obj => obj.registeredCourse.course.unit)
//         const GPA_Three = gpa(pointsThree, courseUnitThree).toFixed(2)
//         // SEMESTER FOUR
//         const pointsFour = semesterFour.map(data => data.point)
//         const courseUnitFour = semesterFour.map(obj => obj.registeredCourse.course.unit)
//         const GPA_Four = gpa(pointsFour, courseUnitFour).toFixed(2)
//         // SEMESTER FIVE
//         const pointsFive = semesterFive.map(data => data.point)
//         const courseUnitFive = semesterFive.map(obj => obj.registeredCourse.course.unit)
//         const GPA_Five = gpa(pointsFive, courseUnitFive).toFixed(2)
//         // SEMESTER FIVE
//         const pointsSix = semesterSix.map(data => data.point)
//         const courseUnitSix = semesterSix.map(obj => obj.registeredCourse.course.unit)
//         const GPA_Six = gpa(pointsSix, courseUnitSix).toFixed(2)
//         //
//         const arrayOfPoints = [...pointsOne, ...pointsTwo, ...pointsThree, ...pointsFour, ...pointsFive, ...pointsSix]
//         const arrayOfUnit = [...courseUnitOne, ...courseUnitTwo, ...courseUnitThree, ...courseUnitFour, ...courseUnitFive, ...courseUnitSix]

//         // calculate CGPA
//         const cgpa = CGPA(arrayOfPoints, arrayOfUnit).toFixed(2)
//         const result = [
//             {
//                 semesterOne,
//                 GPA_One
//             },
//             {
//                 semesterTwo,
//                 GPA_Two
//             },
//             {
//                 semesterThree,
//                 GPA_Three
//             },
//             {
//                 semesterFour,
//                 GPA_Four
//             },
//             {
//                 semesterFive,
//                 GPA_Five
//             },
//             {
//                 semesterSix,
//                 GPA_Six
//             },
//           ]
//         res.status(StatusCodes.OK).json({
//             result,
//             cgpa
//         }
//         )
//         // res.status(StatusCodes.OK).json(fetchResult)

//     } catch (error) {
//         console.log(error);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')
//     }
// }
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
      cgpa,
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
      cgpa,
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
