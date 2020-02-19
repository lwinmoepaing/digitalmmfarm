require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('tiny'))

app.get('/', (req, res) => res.status(200).json({success: true}))

app.get('*', (req, res) => res.status(404).json({message: 'Not Found'}))

module.exports = app
