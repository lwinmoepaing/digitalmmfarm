const express = require('express')
const router = express.Router()
const passport = require('passport')


// Controller
const AuthController = require('../src/Auth/AuthController')

const { successResponse } = require('../lib/responseHandler')

/**
 * @doc : to Login from User Request
 * @param { req } HttpRequest
 */

router.post('/login', AuthController.LOGIN_USER)

/**
 * @doc : Get User Profile
 * @desc : Using Middlware JWT to Authenticate
 */

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	// const {authorization = null} = req.headers
	res.json(successResponse(req.user))
})

/**
 * @doc : Testing Create User
 */
router.post('/', AuthController.CREATE_USER)

module.exports = router
