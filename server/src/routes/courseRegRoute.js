const router = require('express').Router()
const {
    getRegisteredCourse, 
    deleteRegisteredCourse, 
    getRegisteredCourses, 
    registerCourse,
    updateRegisteredCourse
} = require('../controllers/courseRegController')

const roles = require('../config/roles_list')
const verifyRoles = require('../middlewares/verifyRoles')

router.route('/')
    .post(registerCourse)
    .get(verifyRoles(roles.admin), getRegisteredCourses)

router.route('/id')
    .get(verifyRoles(roles.admin, roles.student), getRegisteredCourse)
    .delete(verifyRoles(roles.admin), deleteRegisteredCourse)
    .patch(verifyRoles(roles.admin), updateRegisteredCourse)

module.exports = router


