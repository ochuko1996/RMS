const { getResult, getResults } = require('../controllers/resultController')

const router = require('express').Router()

router.route("/single")
    .get(getResult)
    
router.route("/")
    .get(getResults)

module.exports = router