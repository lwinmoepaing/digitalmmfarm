const JoiDate = require('@hapi/joi-date')
const Joi = require('@hapi/joi').extend(JoiDate)
Joi.objectId = require('joi-objectid')(Joi)

/**
 * Blog Create Validator
 */
const Blog_Create_Validator = ({ body }) => {
	const schema = Joi.object().keys({
		headImg: Joi.string()
			.trim(true)
			.required(),
		title: Joi.string()
			.trim(true)
			.required(),
		body: Joi.string()
			.trim(true)
			.required(),
	})

	const validate = {
		headImg: body.headImg,
		title: body.title,
		body: body.body
	}
	return schema.validate(validate, {abortEarly: false})
}

module.exports.Blog_Create_Validator = Blog_Create_Validator


/**
 * Blog Update Validator
 */
const Blog_Update_Validator = ({ body }) => {

	const schema = Joi.object().keys({
		headImg: Joi.string()
			.trim(true),
		title: Joi.string()
			.trim(true),
		body: Joi.string()
			.trim(true),
	}).min(1)

	return schema.validate(body, {abortEarly: false})
}

module.exports.Blog_Update_Validator = Blog_Update_Validator
