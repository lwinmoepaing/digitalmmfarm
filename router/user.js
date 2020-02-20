const express = require('express')
const passport = require('passport')
const router = express.Router()

// Importing Controller
const AuthController = require('../src/Auth/AuthController')
const UserController = require('../src/User/UserController')

/**
 * Get User Info (Me)
 * @doc : Getting to Self Profile
 */

router.get('/', passport.authenticate('jwt', {session: false}), AuthController.GET_PROFILE_DATA)

/**
 *
 */
router.get('/:id', UserController.GET_USER_BY_ID)

module.exports = router
