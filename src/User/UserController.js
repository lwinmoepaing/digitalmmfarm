const User = require('./UserModel')

const { errorResponse, successResponse } = require('../../lib/responseHandler')
const { DEEP_JSON_COPY } = require('../../lib/helper')
const { User_Update_Validator } = require('./UserValidator')
const { MANAGE_ERROR_MESSAGE } = require('../../lib/helper')

/**
 * GET Profile Data
 */

module.exports.GET_USER_BY_ID = async (req, res) => {
	const {error} = await User_Update_Validator(req)

	if(error) {
		res.status(400).json( MANAGE_ERROR_MESSAGE(error) )
		return
	}

	try {
		const user = await User.findById(req.params.id)
		if(!user) throw new Error ('User Not Found ')

		let data = DEEP_JSON_COPY(user)
		delete data.password
		res.json(successResponse(data))
	} catch (e) {
		res.json(errorResponse(e))
	}
}
