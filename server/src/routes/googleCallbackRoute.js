const updateOrCreateUser = require('../controllers/googleOauthCallbackController')

const router = require('express').Router()

router.get('/auth/google/callback', updateOrCreateUser)

module.exports = router