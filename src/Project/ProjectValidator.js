const JoiDate = require('@hapi/joi-date')
const Joi = require('@hapi/joi').extend(JoiDate)


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

