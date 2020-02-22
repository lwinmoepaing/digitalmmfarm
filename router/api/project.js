const express = require('express')
const router = express.Router()
const passport = require('passport')

// Importing Controller
const ProjectController = require('../../src/Project/ProjectController')

// Get All Projects
router.get('/', ProjectController.GET_ALL_PROJECT)
// Get Project Status From Farmers
router.get('/farmer/status', ProjectController.GET_PROJECT_FROM_FARMERS_STATUS)
// Get Project From Farmers
router.get('/farmer', ProjectController.GET_PROJECT_FROM_FARMERS)


// Get Project From Users
router.get('/user', ProjectController.GET_PROJECT_FROM_USERS)
// Get Project From Users
router.get('/user/status', ProjectController.GET_PROJECT_FROM_USERS_STATUS)

// Check Epired Project
router.get('/checkExpired', ProjectController.CHECK_EXPIRED_AND_SET)

// Create Project By Farmer || User
router.post('/', passport.authenticate('jwt', {session: false}), ProjectController.CREATE_PROJECT)

// Get Project By Id ( Show Project To User or All )
router.get('/:id', ProjectController.GET_PROJECT_BY_ID)

// Set Interested To Project
router.get('/interested/:projectId', passport.authenticate('jwt', {session: false}), ProjectController.SET_PROJECT_INTERESTED)

// Set Contact To Project
router.post('/contact/:projectId', passport.authenticate('jwt', {session: false}), ProjectController.SET_PROJECT_CONTACT)

module.exports = router
