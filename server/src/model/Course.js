const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CoursesSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    unit: {
        type: Number,
        require: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Courses', CoursesSchema)