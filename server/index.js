require('dotenv').config()
const express = require('express')
const app = express()

// dependencies
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const {rateLimit} = require('express-rate-limit')

// utils
const connectDB = require('./src/db/connect')
const corsOptions = require('./src/config/corsOptions')

// routes
const userRoute = require('./src/routes/userRoute')
const authRoute = require('./src/routes/authRoute')
const courseRoute = require('./src/routes/courseRoute')
const refreshToken = require('./src/routes/refreshRoute')
const logout = require('./src/routes/logout')
const courseRegisteration = require('./src/routes/courseRegRoute')
const assessment = require('./src/routes/assessmentRoute')
const department = require('./src/routes/departmentRoute')
const result = require('./src/routes/resultRoute')
const googleOauthHandler = require('./src/routes/getGoogleOauthRoute.js')
const PORT = process.env.PORT | 4500
// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(require('./src/middlewares/credentials'))
 
// helmet 
app.use(helmet())
// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})
app.use(limiter)
// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// middleware for cookies
app.use(cookieParser())



// routes   
app.use('/api',  authRoute)
app.use('/api/refresh', refreshToken)
app.use('/api/logout', logout)
app.use('/api/department', department)
app.use('/api', googleOauthHandler)

// JWT Verification Middleware
app.use(require('./src/middlewares/verifyJWT'))
// protected route
app.use('/api/register-course', courseRegisteration )
app.use('/api/courses', courseRoute)
app.use('/api',  userRoute)
app.use('/api/assessment', assessment )
app.use('/api/result', result)

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
