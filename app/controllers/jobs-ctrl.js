const Job = require('../models/job-model')
const { validationResult } = require('express-validator')
const jobsCtrl = {}

jobsCtrl.list = async (req, res) => {
    res.send('listing all jobs')
}

jobsCtrl.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const body = req.body
    const job = new Job(body)
    job.recruiter = req.user.id
    await job.save()
    res.status(201).json(job)
}

module.exports = jobsCtrl