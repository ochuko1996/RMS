const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseRegSchema = new Schema({
    course:{
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    level: {
        type: String,
        require: true
    },
    semester: {
        type: String,
        require: true
    },
    period: {
        type: String,
        require: true
    },
    createdBy: {
        type: Schema.Types.Number,
        ref: "User"
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('CourseReg', CourseRegSchema)