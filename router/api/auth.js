const express = require('express')
const router = express.Router()
const passport = require('passport')
// Controller
const AuthController = require('../../src/Auth/AuthController')


/**
 * @doc : to Login from User Request
 * @route /api/v{Num}/auth/login
 */

router.post('/login', AuthController.LOGIN_USER)

/**
 * @doc : Get User Profile
 * @desc : Using Middlware JWT to Authenticate
 * @route /api/v{Num}/auth/me
 */

router.get('/me', passport.authenticate('jwt', {session: false}), AuthController.GET_PROFILE_DATA)

/**
 * @doc : Testing Create User
 * @route /api/v{Num}/auth/
 */
router.post('/', AuthController.CREATE_USER)

module.exports = router
