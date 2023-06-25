const gradeNum = [4.00, 3.50, 3.25, 3.00, 2.75, 2.50, 2.25, 2.00, 0.00]
const getGrade = (score)=>{
    switch (true) {
        case score >= 75:
            return gradeNum[0]
            break;
        case score >= 70:
            return gradeNum[1]
            break;
        case score >= 65:
            return gradeNum[2]
            break;
        case score >= 60:
            return gradeNum[3]
            break;
        case score >= 55:
            return gradeNum[4]
            break;
        case score >= 50:
            return gradeNum[5]
            break;
        case score >= 45:
            return gradeNum[6]
            break;
        case score >= 40:
            return gradeNum[7]
            break;
        default:
            return gradeNum[8]
            break;
    }
}

module.exports = getGrade