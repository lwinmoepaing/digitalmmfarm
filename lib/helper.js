module.exports = {
	/**
	 * Deep Clone For JavaScript
	 */
	DEEP_JSON_COPY: (jsonObject) => JSON.parse(JSON.stringify(jsonObject)),

	/**
	 * Joi Error Mapper
	 */
	MANAGE_ERROR_MESSAGE: (error) => {
		const { details } = error
		const data = details.map( err => {
			const { message, context: { label } } = err
			return {
				message,
				key: label
			}
		})

		return {
			errorStatusCode: 1,
			statusCode: 400,
			data
		}
	}
}
