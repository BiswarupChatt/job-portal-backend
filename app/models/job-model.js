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
        minExp: Number,
        maxExp: Number
    },
    skills: [String],
    dueDate: Date,
    salary: {
        minSalary: Number,
        maxSalary: Number
    }
})

const Job = model('job', jobSchema )

module.exports = Job