const { addAssessment, getAssessments } = require('../controllers/assessmentController')

const router = require('express').Router()

router.route('/')
    .post(addAssessment)
    .get(getAssessments)

module.exports = router