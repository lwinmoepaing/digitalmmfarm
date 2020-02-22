const JoiDate = require('@hapi/joi-date')
const Joi = require('@hapi/joi').extend(JoiDate)
Joi.objectId = require('joi-objectid')(Joi)

/**
 * Auth Login Validator
 */
const Project_Create_Validator = ({ body }) => {

	const schema = Joi.object().keys({
		headImg: Joi.string()
			.trim(true)
			.required(),
		title: Joi.string()
			.trim(true)
			.required(),
		body: Joi.array()
			.items(Joi.string())
			.min(1)
			.required(),
		attachmentImg: Joi.array()
			.items(Joi.string()),
		projectExpiredDate: Joi.date()
			.format(['YYYY-MM-DD'])
			.utc()
			.required(),
		projectDuration: Joi.string()
			.trim(true)
			.required(),
		projectCategory: Joi.string()
			.valid(...['Agriculture', 'AnimalHusbandry', 'Both'])
			.required()
	})

	return schema.validate(body, {abortEarly: false})
}

module.exports.Project_Create_Validator = Project_Create_Validator


/**
 * Auth Login Validator
 */
const Project_Update_Validator = ({ body }) => {

	const schema = Joi.object().keys({
		headImg: Joi.string()
			.trim(true),
		title: Joi.string()
			.trim(true),
		body: Joi.array()
			.items(Joi.string())
			.min(1),
		attachmentImg: Joi.array()
			.items(Joi.string()),

		projectExpiredDate: Joi.date()
			.format(['YYYY-MM-DD'])
			.utc(),
		projectDuration: Joi.string()
			.trim(true),
		projectCategory: Joi.string()
			.valid(...['Agriculture', 'AnimalHusbandry', 'Both']),

		projectStartDate: Joi.date()
			.format(['YYYY-MM-DD'])
			.utc(),
		projectEndDate: Joi.date()
			.format(['YYYY-MM-DD'])
			.utc(),
		status: Joi.string()
			.valid(...['Reject', 'Working', 'Finished']),
		acceptedBy: Joi.objectId()
	}).min(1)

	return schema.validate(body, {abortEarly: false})
}

module.exports.Project_Update_Validator = Project_Update_Validator
