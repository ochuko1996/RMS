require('dotenv').config()
const connectDB = require('./src/db/connect')
const Course = require('./src/model/Course')

const jsonCourse = require('./src/utils/course.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Course.deleteMany()
        await Course.create(jsonCourse)
        console.log('Success!!!');
    } catch (error) {
        console.log(error);
    }
}

start()