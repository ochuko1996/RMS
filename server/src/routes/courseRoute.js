const router = require('express').Router()
const { createCourse, deleteCourse, updateCourse, getCourse, getCourses } = require('../controllers/courseController')
const verifyRoles = require('../middlewares/verifyRoles')
const roles = require('../config/roles_list')

router.route("/")
    .post(verifyRoles(roles.admin),createCourse)
    .get(verifyRoles(roles.admin, roles.student), getCourses)
    
router.route("/:id")
    .get(verifyRoles(roles.admin), getCourse)
    .delete(verifyRoles(roles.admin), deleteCourse)
    .patch(verifyRoles(roles.admin), updateCourse)

module.exports = router