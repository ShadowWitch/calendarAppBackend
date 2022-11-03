require('dotenv').config()

const { dbConnection } = require('./database/config')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT
const cors = require('cors')


// Base de datos
dbConnection()

// CORS
app.use(cors())

// Public
app.use(express.static('public'))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// Lectura y parseo del body
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))


app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})