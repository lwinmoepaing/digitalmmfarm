const express = require('express')
const router = express.Router()
const passport = require('passport')

// Importing Controller
const ProjectController = require('../../src/Project/ProjectController')

// Get All Projects
router.get('/', (req, res) => res.json({all: true}))
// Get Project From Farmers
router.get('/farmer', (req, res) => res.json({farmer: !0}))
// Get Project From Users
router.get('/user', (req, res) => res.json({user: !0}))
// Check Epired Project
router.get('/checkExpired', (req, res) => res.json({expired: true}))

// Create Project By Farmer || User
router.post('/', passport.authenticate('jwt', {session: false}), ProjectController.CREATE_PROJECT)

// Get Project By Id ( Show Project To User or All )
router.get('/:id', ProjectController.GET_PROJECT_BY_ID)

// Set Interested To Project
router.get('/interested/:projectId', passport.authenticate('jwt', {session: false}), ProjectController.SET_PROJECT_INTERESTED)

// Set Contact To Project
router.post('/contact/:projectId', passport.authenticate('jwt', {session: false}), ProjectController.SET_PROJECT_CONTACT)

module.exports = router
