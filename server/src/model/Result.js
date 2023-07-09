const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultSchema = new Schema({
    assessment: {
        type: Schema.Types.ObjectId,
        ref: "Assessment"
    },
    matricNo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})