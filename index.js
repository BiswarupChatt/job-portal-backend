require('dotenv').config()
const express = require('express')
const configureDB = require('./config/db')
const userRegisterValidationSchema = require('./app/validations/user-register-validation')
const {checkSchema} = require('express-validator')
const userCtrl = require('./app/controllers/users-ctrl')
const userLoginValidationSchema = require('./app/validations/user-login-validation')
const app = express()
const port = 3333

configureDB()
app.use(express.json())

app.post('/users/register', checkSchema(userRegisterValidationSchema), userCtrl.register)
app.post('/users/login', checkSchema(userLoginValidationSchema), userCtrl.login)


app.listen(port, () => {
    console.log('server is running on port', port)
})