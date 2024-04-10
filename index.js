require('dotenv').config()
const express = require('express')
const configureDB = require('./config/db')
const app = express()
const port = 3333

configureDB()

app.listen(port, () => {
    console.log('server is running on port', port)
})