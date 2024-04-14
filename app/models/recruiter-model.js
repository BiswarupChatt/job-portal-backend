const mongoose = require('mongoose')
const { Schema, model } = mongoose

const recruiterSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    companyName: String,
    website: String,
    address: String
}, { timestamps: true })

const recruiter = model('recruiter', recruiterSchema)

module.exports = recruiter