module.exports = (error, req, res, _next) => {
	const { statusCode = 500, message = 'Something went wrong', data } = error

	const errorResponse = {
		errorCode: 1, // it would be vary
		message,
		data
	}
	const Console = console
	Console.error(`Error ${statusCode}: ${message}` , _next)
	res.status(statusCode).json(errorResponse)
}
