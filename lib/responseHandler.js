module.exports = {
	successResponse (data) {
		const response = {
			errorCode: 0,
			message: 'Success',
			data
		}
		return response
	},
	errorResponse (error, data = null) {
		const { message = null } = error
		const errorResponse = {
			errorCode: 1,
			message,
			data
		}
		return errorResponse
	}
}
