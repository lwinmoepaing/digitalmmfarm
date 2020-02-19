const express = require('express')
const router = express.Router()
const UserRouter = require('./user')
const ProjectRouter = require('./project')

// Set Configure Routes
router.use('/user', UserRouter)
router.use('/project', ProjectRouter)

module.exports = router
