const { validationResult } = require('express-validator')
const Recruiter = require('../models/recruiter-model')
const recruiterCtrl = {}

recruiterCtrl.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const body = req.body
        const recruiter = new Recruiter(body)
        recruiter.userId = req.user.id
        await recruiter.save()
        res.json(recruiter)
    } catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'something went wrong' })
    }
}

recruiterCtrl.show = async (req, res) => {
    try {
        const recruiter = await Recruiter.findOne({ userId: req.user.id })
        res.json(recruiter)
    } catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'something went wrong' })
    }
}

recruiterCtrl.update = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const body = req.body
        const recruiter = await Recruiter.findOneAndUpdate({ userId: req.user.id }, body, { new: true })
        res.json(recruiter)
    } catch (err) {
        console.log(err)
        res.status(500).json({ errors: 'something went wrong' })
    }
}

recruiterCtrl.delete = async (req, res) => {
    //todo
    res.send('delete recruiter profile')
}


module.exports = recruiterCtrl