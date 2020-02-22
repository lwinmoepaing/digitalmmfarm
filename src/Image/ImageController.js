const Image = require('./ImageModal')
const { errorResponse } = require('../../lib/responseHandler')

/**
 * Creating Image
 */
module.exports.CREATE_IMAGE = async (req, res) => {
	try {

		if( !req.file ) {
			throw new Error('Invalid File')
		}

		const image = new Image({
			url: `/images/${req.file.filename}`,
			user: `${req.user._id}`,
			note: req.body.note || ''
		})

		await image.save()

		res.json({ image })
	} catch (e) {
		res.status(404).json(errorResponse(e))
	}
}



