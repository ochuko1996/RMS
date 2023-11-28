const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    matricNo: {
        type: Number,
        // require: true,
        maxlength: [10, "matricultion number shouldn't be more than 10 digits"]
    },
    firstName: {
        type: String,
        require: [true, "must provide first name"],
        trim: true,
    }, 
    lastName: {
        type: String,
        require: [true, "must provide last name"],
        trim: true,
    },
    email: {
        type: String,
        require: [true, "must provide email"],
        trim: true,
    },
    password: {
        type: String,
        require: [true, "must provide password"],
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
    },
    registeredCourses: [
        {
            type: Schema.Types.ObjectId,
            ref: "CourseReg"
        }
    ],
     refreshToken: String,
    roles: {
        student: {
            type: Number,
            default: 1000
        },
        admin: Number,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)