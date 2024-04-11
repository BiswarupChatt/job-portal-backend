const User = require('../models/user-model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
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

userCtrl.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const body = req.body
    try {
        const user = await User.findOne({ email: body.email })
        if (user) {
            const isAuth = await bcryptjs.compare(body.password, user.password)
            if (isAuth) {
                const tokenData = {
                    id: user._id,
                    role: user.role
                }
                const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d' })
                res.json({ token: token })
            } else {
                return res.status(404).json({ error: 'invalid credentials' })
            }
        } else {
            return res.status(404).json({ error: 'invalid credentials' })
        }
    } catch (err) {
        res.status(500).json({ error: 'something went wrong' })
    }
}

userCtrl.account = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        return res.json(user)
    } catch(err) {
       return res.status(500).json({ error: 'something went wrong'})
    }
}


module.exports = userCtrl