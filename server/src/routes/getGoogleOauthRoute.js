const router = require('express').Router()
const {googleOauth} = require('../controllers/googleOauthController')
router.get('/auth/google/url', googleOauth)

module.exports = router