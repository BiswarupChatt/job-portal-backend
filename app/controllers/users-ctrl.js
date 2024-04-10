const User = require('../models/user-model')
const bcryptjs = require('bcryptjs')

const { validationResult } = require("express-validator")

const userCtrl = {}

userCtrl.register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    try {
        const salt = await bcryptjs.genSalt()
        const hashPassword = await bcryptjs.hash(body.password, salt)
        const user = new User(body)
        user.password = hashPassword
        await user.save()
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json({ error: 'something went wrong' })
    }
}


module.exports = userCtrl