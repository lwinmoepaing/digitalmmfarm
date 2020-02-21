const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)
const { ROLES } = require('../../config')

// (?=^(09))([0-9]{6,11})$|(?=^(01))([0-9]{6,8})$

/**
 * User Update Validator
 */
const User_Update_Validator = ({ body, params: { id } }) => {
	const schema = Joi.object().keys({
		id: Joi.objectId()
			.required(),
		name: Joi.string()
			.trim(true)
			.min(3)
			.max(30)
		,
		password: Joi.string(),
		role: Joi.string().valid(...ROLES),
		skills: Joi.array()
	}).min(1)
	return schema.validate({ id, ...body}, {abortEarly: false})
}

module.exports.User_Update_Validator = User_Update_Validator
