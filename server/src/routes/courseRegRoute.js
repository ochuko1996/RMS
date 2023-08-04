const router = require('express').Router()
const {
    getRegisteredCourse, 
    deleteRegisteredCourse, 
    getRegisteredCourses,  
    registerCourse,
    updateRegisteredCourse,
    getAllRegisteredCourses
} = require('../controllers/courseRegController')

const roles = require('../config/roles_list')
const verifyRoles = require('../middlewares/verifyRoles')

router.route('/')
    .post(registerCourse)
    .get(getRegisteredCourses)
router.route('/admin')
    .get(getAllRegisteredCourses)

router.route('/:id')
    .get(verifyRoles(roles.admin, roles.student), getRegisteredCourse)
    .delete(deleteRegisteredCourse)
    .patch(verifyRoles(roles.admin), updateRegisteredCourse)

module.exports = router


