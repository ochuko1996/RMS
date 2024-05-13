const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssessmentSchema = Schema({
  classWork: {
    type: Number,
    default: 0,
    required: true,
  },
  exam: {
    type: Number,
    default: 0,
    required: true,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  point: {
    type: Number,
    required: true,
    default: 0,
  },
  gradeLetter: {
    type: String,
    required: true,
  },
  registeredCourse: {
    type: Schema.Types.String,
    ref: "CourseReg",
  },
  matricNo: {
    type: Schema.Types.Number,
    ref: "User",
  },
});

module.exports = mongoose.model("Assessment", AssessmentSchema);
