const User = require('./UserModel')

const { errorResponse, successResponse } = require('../../lib/responseHandler')
const { DEEP_JSON_COPY } = require('../../lib/helper')
const { User_Update_Validator } = require('./UserValidator')
const { MANAGE_ERROR_MESSAGE } = require('../../lib/helper')

/**
 * GET Profile Data
 */

module.exports.GET_USER_BY_ID = async (req, res) => {
	const {error, value} = await User_Update_Validator(req)

	if(error) {
		res.status(400).json( MANAGE_ERROR_MESSAGE(error) )
		return
	}

	try {
		const user = await User.findById(req.params.id)
		if(!user) throw new Error ('User Not Found ')

		const isCondition = user._id === req.user._id || req.user.role === 'Admin'
		if(!isCondition) {
			throw new Error('Not Allowed')
		}
		const { body } = req

		const oldData = await User.findByIdAndUpdate(req.params.id, body)
		const data = {
			...DEEP_JSON_COPY(oldData),
			...value
		}
		res.status(200).json(successResponse(data, 'Successfully Updated'))

	} catch (e) {
		res.status(400).json(errorResponse(e))
	}
}

/**
 * DELETE User By Id
 */

module.exports.DELETE_USER_BY_ID = async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		if(!user) throw new Error ('User Not Found ')

		const isAdmin = req.user.role === 'Admin'
		if(!isAdmin) {
			throw new Error('Not Allow Methods ')
		}

		await User.findByIdAndDelete(req.params.id)
		res.status(200).json(successResponse(null, 'Successfully Deleted'))
	} catch (e) {
		res.status(400).json(errorResponse(e))
	}
}
