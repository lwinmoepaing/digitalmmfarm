const express = require('express')
const router = express.Router()
const passport = require('passport')

// Importing Controller
const ProjectController = require('../../src/Project/ProjectController')

router.post('/', passport.authenticate('jwt', {session: false}), ProjectController.CREATE_PROJECT)

module.exports = router
