//packages
require('dotenv').config()
const express = require('express')
const { checkSchema } = require('express-validator')

//files
const configureDB = require('./config/db')
const {userRegisterValidationSchema, userLoginValidationSchema} = require('./app/validations/user-validation')
const userCtrl = require('./app/controllers/users-ctrl')
const jobsCtrl = require('./app/controllers/jobs-ctrl')
const authenticateUser = require('./app/middlewares/authenticateUser')
const authorizeUser = require('./app/middlewares/authorizeUser')



const app = express()
const port = 3333

configureDB()
app.use(express.json())

//application level middleware - using it for logging request for debug purpose
app.use(function(req, res, next){
    console.log(`${req.ip} - ${req.method}- ${req.url}- ${new Date()}`)
    next()
})


//user start
app.post('/users/register', checkSchema(userRegisterValidationSchema), userCtrl.register)
app.post('/users/login', checkSchema(userLoginValidationSchema), userCtrl.login)
//routing level middleware
app.get('/users/account', authenticateUser, userCtrl.account)
//user end
 
//jobs start
app.get('/api/jobs', authenticateUser, jobsCtrl.list)
app.post('/api/jobs', authenticateUser, authorizeUser(['recruiter']), jobsCtrl.create)


app.listen(port, () => {
    console.log('server is running on port', port)
})