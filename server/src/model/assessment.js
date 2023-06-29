const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AssessmentSchema = Schema({
    classWork:{
        type: Number,
        default: 0,
        require: true
    },
    exam:{
        type: Number,
        default: 0,
        require: true   
    },
    total: {
        type: Number,
        require: true,
        default: 0,
    },
    point: {
        type: Number,
        require: true,
        default: 0
    },
    course: {
        type: Schema.Types.String,
        ref: "CourseReg"
    },
    matricNo: {
        type: Schema.Types.Number,
        ref: "User"
    }
})

module.exports = mongoose.model("Assessment", AssessmentSchema)




