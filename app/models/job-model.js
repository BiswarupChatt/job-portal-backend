const mongoose = require('mongoose')
const {Schema, model} = mongoose

const jobSchema = new Schema ({
    title: String,
    description: String,
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    openings: Number,
    location: [String],
    jobType: String,
    experience: {
        min: Number,
        max: NUmber
    },
    skills: [String],
    dueDate: Date,
    package: {
        min: Number,
        max: NUmber
    }
})

const Job = model('job', jobSchema )

module.exports = Job