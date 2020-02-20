const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
// Modal Import
const User = require('../User/UserModel')
// Self Import
const { JWT_SECRET } = require('../../config')
const { MANAGE_ERROR_MESSAGE } = require('../../lib/helper')
const { errorResponse, successResponse } = require('../../lib/responseHandler')
const { Auth_Register_Validator, Auth_Login_Validator } = require('./AuthValidator')

/**
 * CREATE USER
 */

module.exports.CREATE_USER = async (req, res) => {
	const {error} = await Auth_Register_Validator(req)

	if(error) {
		res.status(400).json( MANAGE_ERROR_MESSAGE(error) )
	}

	try {
		const isExistUser = await User.findOne({email: req.body.email })
		if(isExistUser) {
			res.status(400).json(errorResponse({message: 'Your email is Already Registered'}))
		}

		const salt = await bcrypt.genSalt(10)
		const password = await bcrypt.hash(req.body.password, salt)
		const user = new User({ ...req.body, password })
		await user.save()
		res.status(200).json(
			successResponse({
				id: user._id,
				name: user.name,
				email: user.email
			} ,'Register Successful')
		)
	}
	catch (e) {
		res.status(500).json(errorResponse(e))
	}
}

/**
 * Login User
 */

module.exports.LOGIN_USER = async (req, res) => {
	// Check Validating
	const { error } = await Auth_Login_Validator(req)

	if(error) {
		res.status(400).json( MANAGE_ERROR_MESSAGE(error) )
	}

	passport.authenticate('local', {session: false}, (err, user) => {
		if (err || !user) {
			return res.status(400).json(errorResponse(err))
		}
		req.login(user, {session: false}, (err) => {
			if (err) { res.status(400).json(errorResponse(err)) }
			// Filters Data
			const { _id, role, name, email, skills } = user
			const data = { _id, role, name, email, skills }
			// Set JWT Token
			const token = jwt.sign(data, JWT_SECRET)
			return res.json({ ...successResponse(data), token})
		})
	})(req, res)
}


/**
 * GET Profile Data
 */

module.exports.GET_PROFILE_DATA = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email })
		res.json(successResponse(user))
	} catch (e) {
		res.json(errorResponse(e))
	}
}
