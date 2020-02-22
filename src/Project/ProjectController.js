const { successResponse } = require('../../lib/responseHandler')

module.exports.CREATE_PROJECT = (req, res) => {
	res.json(successResponse('PROJECT SUCCESS'))
}
