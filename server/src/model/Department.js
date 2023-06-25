const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departmentSchema = Schema({
    departmentName: {
        type: String,
        maxlength: [30, "department should't be more less than 30 characters"],
        require: true,
    }
})

module.exports = mongoose.model("Department", departmentSchema)