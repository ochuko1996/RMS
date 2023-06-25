const router = require('express').Router()
const { addDepartment, getDepartments, updateDepartment, deleteDepartment, getDepartment } = require('../controllers/departmentController')
const roles = require('../config/roles_list')
const verifyRoles = require('../middlewares/verifyRoles')

router.route('/')
    .post(addDepartment)
    .get(getDepartments)
router.route('/:id')
    .get( getDepartment)
    .put( updateDepartment)
    .delete( deleteDepartment)

module.exports = router