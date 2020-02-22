const express = require('express')
const router = express.Router()
const passport = require('passport')

// Importing Controller
const ProjectController = require('../../src/Project/ProjectController')


// Create Project By Farmer || User
router.post('/', passport.authenticate('jwt', {session: false}), ProjectController.CREATE_PROJECT)

// Get Project By Id ( Show Project To User or All )
router.get('/:id', ProjectController.GET_PROJECT_BY_ID)

// Set Interested To Project
router.get('/project/interested/:project_id', ProjectController.SET_PROJECT_INTERESTED)

module.exports = router
