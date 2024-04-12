//packages
require('dotenv').config()
const express = require('express')
const { checkSchema } = require('express-validator')
const morgan = require('morgan')

//files
const configureDB = require('./config/db')
const {userRegisterValidationSchema, userLoginValidationSchema} = require('./app/validations/user-validation')
const {candidateValidationSchema} = require('./app/validations/candidate-validation')
const userCtrl = require('./app/controllers/users-ctrl')
const jobsCtrl = require('./app/controllers/jobs-ctrl')
const candidatesCtrl = require('./app/controllers/candidate-ctrl')
const authenticateUser = require('./app/middlewares/authenticateUser')
const authorizeUser = require('./app/middlewares/authorizeUser')



const app = express()
const port = 3333

configureDB()
app.use(express.json())
app.use(morgan('common'))

//application level middleware - using it for logging request for debug purpose
// app.use(function(req, res, next){
//     console.log(`${req.ip} - ${req.method}- ${req.url}- ${new Date()}`)
//     next()
// })


//user start
app.post('/users/register', checkSchema(userRegisterValidationSchema), userCtrl.register)
app.post('/users/login', checkSchema(userLoginValidationSchema), userCtrl.login)
//routing level middleware (authenticateUser)
app.get('/users/account', authenticateUser, userCtrl.account)
//user end
   
//jobs start
app.get('/api/jobs', authenticateUser, jobsCtrl.list)
app.post('/api/jobs', authenticateUser, authorizeUser(['recruiter']), jobsCtrl.create)
//job end

// candidate start
app.post('/api/candidate/profile', authenticateUser, authorizeUser(['candidate']), checkSchema(candidateValidationSchema), candidatesCtrl.create, )
app.get('/api/candidate/profile', candidatesCtrl.show, )
app.put('/api/candidate/profile', candidatesCtrl.update, )





app.listen(port, () => {
    console.log('server is running on port', port)
})