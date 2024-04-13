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
        res.status(500).json({errors: 'something went wrong'})
    }
}

recruiterCtrl.show =async(req, res)=>{
    res.send('show recruiter profile')
}

recruiterCtrl.update = async(req,res)=>{
    res.send('update recruiter profile')
}

recruiterCtrl.delete = async(req, res)=>{
    res.send('delete recruiter profile')
}


module.exports = recruiterCtrl