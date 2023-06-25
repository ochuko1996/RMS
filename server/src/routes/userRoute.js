const router = require('express').Router()

const {getUser, getUsers, deleteUser, updateUser} = require('../controllers/userController')

router.route("/user")
    .get(getUsers)

router.route("/user/:id")
    .get(getUser)
    .delete(deleteUser)
    .patch(updateUser)


module.exports = router