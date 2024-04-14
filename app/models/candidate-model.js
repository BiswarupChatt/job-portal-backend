const mongoose = require('mongoose')
const { Schema, model } = mongoose

const candidateSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: String,
    lastName: String,
    mobile: Number,
    address: String
}, { timestamps: true })

const candidate = model('candidate', candidateSchema)

module.exports = candidate