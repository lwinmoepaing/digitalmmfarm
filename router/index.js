const express = require('express')
const router = express.Router()
// Calling Routers
const UserRouter = require('./user')
const ProjectRouter = require('./project')
const AuthRouter = require('./auth')

// Set Configure Routes
router.use('/user', UserRouter)
// Project Router
router.use('/project', ProjectRouter)
// Authentication
router.use('/auth', AuthRouter)

module.exports = router
