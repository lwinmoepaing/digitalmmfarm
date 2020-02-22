const User = require('./UserModel')

const { PAGINATE_LABELS } = require('../../config')
const { errorResponse, successResponse } = require('../../lib/responseHandler')
const { DEEP_JSON_COPY } = require('../../lib/helper')
const { User_Update_Validator } = require('./UserValidator')
const { MANAGE_ERROR_MESSAGE } = require('../../lib/helper')


/**
 * User Lists
 */

module.exports.GET_ALL_USERS = async (req, res) => {

	const { page = 1 } = req.query
	const limit = 10
	const options = {
		select: '_id name email phone role skills',
		sort: { createdAt: -1 },
		page,
		limit,
		customLabels: PAGINATE_LABELS
	}

	const users = await User.paginate({}, options)
	res.status(200).json(users)
}


/**
 * Update User Profile By Id
 */

module.exports.UPDATE_USER_BY_ID = async (req, res) => {
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

/**
 * GET USER by ID
 */
module.exports.GET_USER_BY_ID = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('_id name role skills')
		if(!user) throw new Error ('User Not Found ')
		res.status(200).json(successResponse(user))
	} catch (e) {
		res.status(400).json(errorResponse(e))
	}
}
