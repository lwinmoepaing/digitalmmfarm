const multer = require('multer')
const path = require('path')
const uuidv4 = require('uuid/v4')


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, `${__dirname}/../images`)
	},
	filename: function (req, file, cb) {
		const fileName = `${uuidv4()}${path.extname(file.originalname)}`
		cb(null, fileName)
	}
})

const fileFilter = (req, file, cb) => {
	if (
		!file.mimetype.includes('jpeg') &&
		!file.mimetype.includes('jpg') &&
		!file.mimetype.includes('png') &&
		!file.mimetype.includes('gif')
	) {
		return cb(null, false, new Error('Only images are allowed'))
	} else {
		cb(null, true)
	}
}

module.exports.upload = multer({ storage, fileFilter })
