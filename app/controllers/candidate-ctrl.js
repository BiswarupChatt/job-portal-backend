const Candidate = require('../models/candidate-model')
const { validationResult } = require('express-validator')
const candidatesCtrl = {}

candidatesCtrl.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const body = req.body
        const candidate = new Candidate(body)
        candidate.userId = req.user.id
        await candidate.save()
        res.json(candidate)
    } catch(err){
        res.status(500).json({error: 'something went wrong'})
    }
    
}

candidatesCtrl.show = async (req, res) => {
    res.send('show candidate profile')
}

candidatesCtrl.update = async (req, res) => {
    res.send('update candidate profile')
}

candidatesCtrl.delete = async (req, res) => {
    res.send(' delete recruiter profile')
}

module.exports = candidatesCtrl