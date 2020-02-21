const express = require('express')
const router = express.Router()
// Calling Routers
const UserRouter = require('./user')
const ProjectRouter = require('./project')
const AuthRouter = require('./auth')
const ImageRouter = require('./image')

// Set Configure Routes
router.use('/user', UserRouter)
// Project Router
router.use('/project', ProjectRouter)
// Authentication
router.use('/auth', AuthRouter)
// Image
router.use('/images', ImageRouter)

module.exports = router
