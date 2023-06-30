require('dotenv').config()
const express = require('express')
const app = express()

// dependencies
const cookieParser = require('cookie-parser')
const cors = require('cors')

// utils
const connectDB = require('./src/db/connect')
const {corsOptions} = require('./src/config/corsOptions')

// routes
const userRoute = require('./src/routes/userRoute')
const authRoute = require('./src/routes/authRoute')
const courseRoute = require('./src/routes/courseRoute')
const refreshToken = require('./src/routes/refreshRoute')
const logout = require('./src/routes/logout')
const courseRegisteration = require('./src/routes/courseRegRoute')
const assessment = require('./src/routes/assessmentRoute')
const department = require('./src/routes/departmentRoute')


const PORT = process.env.PORT | 4500
 
// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(require('./src/middlewares/credentials'))

// Cross Origin Resource Sharing
// app.use(cors(corsOptions))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// app.use(cors())

// middleware for cookies
app.use(cookieParser())

// routes
app.use('/api',  authRoute)
app.use('/api/refresh', refreshToken)
app.use('/api/logout', logout)
app.use('/api/department', department)

// JWT Verification Middleware
app.use(require('./src/middlewares/verifyJWT'))
// protected route
app.use('/api',  userRoute)
app.use('api/courses', courseRoute)
app.use('/api/register-course', courseRegisteration )
app.use('/api/assessment', assessment )

app.use('/api/', (req, res)=>{
    res.send('<h1>RESULT MANAGEMENT SYSTEM</h1>') 
})


const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=> console.log(`SERVER IS RUNNING ON PORT: ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}
start()