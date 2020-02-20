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
 *
 */

module.exports.CREATE_USER = async (req, res) => {
	const {error} = await Auth_Register_Validator(req)

	if(error) {
		res.status(400).json( MANAGE_ERROR_MESSAGE(error) )
	}

	try {
		const isExistUser = await User.find({ email: req.body.email })
		if(isExistUser.length) {
			res.status(400).json(errorResponse({message: 'Your email is Already Registered'}))
		}

		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(req.body.password, salt)
		const user = new User({ ...req.body, password: hash})
		await user.save()
		const { _id, name, email} = user
		res.status(200).json(
			successResponse({
				id: _id,
				name,
				email
			} ,'Successful Login')
		)
	}
	catch (e) {
		res.status(500).json(errorResponse(e))
	}
}

/**
 *
 */

module.exports.LOGIN_USER = async (req, res) => {
	// Check Validating
	const { error } = await Auth_Login_Validator(req)

	if(error) {
		res.status(400).json( MANAGE_ERROR_MESSAGE(error) )
	}

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
}
