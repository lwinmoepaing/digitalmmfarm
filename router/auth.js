const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const { successResponse, errorResponse } = require('../lib/responseHandler')

/**
 * @doc : to Login from User Request
 * @param { req } HttpRequest
 */
router.post('/', (req, res) => {
	passport.authenticate('local', {session: false}, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				message: 'Something is not right',
				user
			})
		}
		req.login(user, {session: false}, (err) => {
			if (err) { res.status(400).json(errorResponse(err)) }
			// generate a signed son web token with the contents of user object and return it in the response
			const token = jwt.sign(user, JWT_SECRET)
			// console.log('JWT_SECRET',)
			return res.json({ ...successResponse(user), token})
		})
	})(req, res)
})

/**
 * @doc : Get User Profile
 * @desc : Using Middlware JWT to Authenticate
 */

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	// const {authorization = null} = req.headers
	res.json(successResponse(req.user))
})

module.exports = router
