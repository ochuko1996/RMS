const { StatusCodes } = require('http-status-codes')
const CourseReg = require('../model/CourseReg')
const User = require('../model/User')

const registerCourse = async (req, res) => {
    const matricNo = req.user.matricNo
    const createdBy = req.user._id
    const { course, semester, period, level } = req.body
    try {
        const duplicateRegisteredCourse = await CourseReg.findOne({ course, matricNo })

        // check for duplicate of registered course
        if (duplicateRegisteredCourse) return res.status(StatusCodes.CONFLICT).json(`course with this ${course} already exist`)

        // register new course
        const registeredCourse = await CourseReg.create({
            course,
            semester,
            period,
            level,
            createdBy,
            matricNo
        })

        // find user and push registered course to the user model
        const updatedUser = await User.findOneAndUpdate(
            { matricNo: matricNo },
            { $push: { registeredCourses: registeredCourse._id } },
            { new: true }
        );
        console.log(updatedUser);

        res.status(StatusCodes.CREATED).json(registeredCourse)
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')
    }
}

const getRegisteredCourses = async (req, res) => {
    // const {} = req.query
    const studentId = req.user.matricNo
    try {
        const registeredCourses = await User.find({ matricNo: studentId }).select("registeredCourses").populate({
            path: "registeredCourses",
            populate: {
                path: "course",
                model: "Courses"
            }
        })
        const allRegisteredCourses = registeredCourses[0].registeredCourses

        // check for any existing Registered Courses
        if (!allRegisteredCourses) return res.status(StatusCodes.NOT_FOUND).json("no registered courses found")

        // return registered courses
        res.status(StatusCodes.OK).json(allRegisteredCourses)

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something went wrong ")
    }
}
const getAllRegisteredCourses = async (req, res) => {
    const { departmentName, unit, name, semester, period, level, schoolSession } = req.query
    // const RegExFunc = (query) => {
    //     return { $regex: new RegExp(query, "i") }
    // }
    const queryObject = {
        // matricNo: { $ne: null }, // Include users with a non-null "matricNo"
        // registeredCourses: { $exists: true, $not: { $size: 0 } } // Include users with registered courses
    }
    // const queryObject = {}
    if (departmentName) {
        queryObject.departmentName = departmentName
    }
    if (unit) {
        queryObject.unit = unit
    }
    if (semester) {
        queryObject.semester = semester
    }
    if (period) {
        // queryObject.period = RegExFunc(period)
        queryObject.period = period
    }
    if (level) {
        queryObject.level = level
    }
    if (schoolSession) {
        queryObject.schoolSession = schoolSession
    }
    // if (name) {
    //     queryObject.name = name
    // }
   
    try {
        let registeredCourses
        if (name) {
            // Add the "name" filter to the populate query using the "match" option
            const populatedQuery = {
                path: "course",
                model: "Courses",
                match: { name: { $regex: new RegExp(name, "i") } } // Case-insensitive match on the "name" field in the Courses collection
                // match: { name: name } // Case-insensitive match on the "name" field in the Courses collection
            };
            registeredCourses = await CourseReg.find(queryObject)
                .populate(populatedQuery)
                .exec()
                console.log(registeredCourses);
        } else {
            registeredCourses = await CourseReg.find(queryObject).populate({
                path: "course",
                model: "Courses"
            })
            .exec()
            console.log(registeredCourses);
        }
        // check for any existing Registered Courses
        if (!registeredCourses || registeredCourses.length === 0) return res.status(StatusCodes.NOT_FOUND).json("no registered courses found")

        // return registered courses
        res.status(StatusCodes.OK).json(registeredCourses)

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something went wrong ")
    }
}

const getRegisteredCourse = async (req, res) => {
    // student id
    const studentId = req.user.matricNo
    // get id from request parameter
    const id = req.params.id
    try {

        // get single registered course
        const singleRegisteredCourse = await User.findOne(
            {
                matricNo: studentId,
                "registeredCourses._id": id
            }
        )

        // check if course is registered
        if (!singleRegisteredCourse) res.status(StatusCodes.NOT_FOUND).json(`No registered course with this ${id}`)

        res.status(StatusCodes.OK).json(singleRegisteredCourse)
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something went wrong ")
    }
}

const deleteRegisteredCourse = async (req, res) => {
    // studentId
    const studentId = req.user.matricNo
    // get id from request parameter
    const id = req.params.id
    console.log(studentId, id);
    try {
        // check if id exist
        if (!id) return res.status(StatusCodes.NOT_FOUND).json(`No registered course with this ${id}`)

        // delete registered course
        // await CourseReg.findOneAndDelete({_id: id})
        const updatedUser = await User.findOneAndUpdate(
            { matricNo: studentId },
            { $pull: { registeredCourses: id } },
            { new: true } // Return the updated document
        );
        console.log(updatedUser.registeredCourses);

        if (!updatedUser) {
            console.log(`User with matricNo ${studentId} not found.`);
        } else {
            console.log(`Course with ID ${id} deleted successfully.`);
        }
        res.sendStatus(StatusCodes.NO_CONTENT)
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something went wrong ")
    }
}

const updateRegisteredCourse = async (req, res) => {
    // get id from request parameter
    const id = req.params.id
    try {
        // check if id exist
        if (!id) return res.status(StatusCodes.NOT_FOUND).json(`No registered course with this ${id}`)

        // update registered course
        const updatedRegisterCourse = await CourseReg.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { returnOriginal: false }
        )

        res.status(StatusCodes.OK).json(updatedRegisterCourse)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json("Something went wrong ")
    }
}

module.exports = {
    registerCourse,
    getRegisteredCourses,
    updateRegisteredCourse,
    deleteRegisteredCourse,
    getRegisteredCourse,
    getAllRegisteredCourses
}