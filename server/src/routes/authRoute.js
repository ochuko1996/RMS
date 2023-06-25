const router = require('express').Router()

const {login,register} = require('../controllers/authController')

   
router.post("/auth/register", register)
router.post("/auth/login", login)


module.exports = router