const gradeNum = [4.0, 3.5, 3.25, 3.0, 2.75, 2.5, 2.25, 2.0, 0.0];

const getGrade = (score) => {
  switch (true) {
    case score >= 75:
      return {
        point: gradeNum[0],
        gradeLetter: "A",
      };
    case score >= 70:
      return {
        point: gradeNum[1],
        gradeLetter: "AB",
      };
    case score >= 65:
      return {
        point: gradeNum[2],
        gradeLetter: "B",
      };
    case score >= 60:
      return {
        point: gradeNum[3],
        gradeLetter: "BC",
      };
    case score >= 55:
      return {
        point: gradeNum[4],
        gradeLetter: "C",
      };
    case score >= 50:
      return {
        point: gradeNum[5],
        gradeLetter: "CD",
      };
    case score >= 45:
      return {
        point: gradeNum[6],
        gradeLetter: "D",
      };
    case score >= 40:
      return {
        point: gradeNum[7],
        gradeLetter: "E",
      };
    default:
      return {
        point: gradeNum[8],
        gradeLetter: "F",
      };
  }
};
// console.log(getGrade(65));
// 3.50 & above =Distinction; 3.00–3.49 =Upper Credit; 2.50–2.99 =Lower Credit and 2.00–2.49 =Pass.
const grading = ["Distinction", "Upper Credit", "Lower Credit", "Pass", "Fail"];

const getCgpa = (prop) => {
  switch (true) {
    case prop >= 3.5:
      return grading[0];
      break;
    case prop >= 3.0 && prop <= 3.49:
      return grading[1];
      break;
    case prop >= 2.5 && prop <= 2.99:
      return grading[2];
      break;
    case prop >= 2.0 && prop <= 2.49:
      return grading[3];
      break;
    default:
      return grading[4];
      break;
  }
};
module.exports = { getGrade, getCgpa };
