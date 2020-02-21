const express = require('express')
const router = express.Router()
const fs = require('fs')

const data = fs.readdirSync(__dirname + '/../router/api')

data.forEach(route => {
	router.use(`/${route.split('.')[0]}`, require(`../router/api/${route}`))
})

module.exports = router
