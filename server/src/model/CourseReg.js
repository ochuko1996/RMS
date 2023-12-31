const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseRegSchema = new Schema({
    course:{
        type: Schema.Types.ObjectId,
        ref: "Courses"
    },
    level: {
        type: String,
        required: true
    },
    semester: {
        type: String,   
        required: true
    },
    period: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    matricNo: {
        type: Schema.Types.Number, 
        ref: "User"
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('CourseReg', CourseRegSchema)