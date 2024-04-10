const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String
}, { timeStamp: true })

const User = model('User', userSchema)

module.exports = User