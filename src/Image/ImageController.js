// const Image = require('./ImageModal')
const { errorResponse } = require('../../lib/responseHandler')



/**
 * Creating Image
 */

module.exports.CREATE_IMAGE = async (req, res) => {
	try {
		const { file } = req

		if (!file) {
			throw new Error('File Is Invalid')
		}
		// "fieldname": "image",
		//     "originalname": "Screenshot (6).png",
		//     "encoding": "7bit",
		//     "mimetype": "image/png",
		//     "destination": "C:\\Users\\pro gamer\\Desktop\\Digital MM Farm\\digital-mm-farm-api\\middleware/../images",
		//     "filename": "382ec4c3-85b0-4281-9908-de5a00d1f36c..png",
		//     "path": "C:\\Users\\pro gamer\\Desktop\\Digital MM Farm\\digital-mm-farm-api\\images\\382ec4c3-85b0-4281-9908-de5a00d1f36c..png",
		//     "size": 315940

		res.json({file})

	} catch (e) {
		res.status(400).json(errorResponse(e))
	}

}

