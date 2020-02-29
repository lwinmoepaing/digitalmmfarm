const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const { errorResponse } = require('../../lib/responseHandler')
// const { FILE_TO_BUFFER } = require('../../lib/helper')


var mime = {
	html: 'text/html',
	txt: 'text/plain',
	css: 'text/css',
	gif: 'image/gif',
	jpg: 'image/jpeg',
	png: 'image/png',
	svg: 'image/svg+xml',
	js: 'application/javascript',
	json: 'application/json'
}

/**
 * @doc : Fetching Image File
 * @route /api/v{Num}/image
 * @return { Stream }
 */

// router.get('/:image', (req, res) => {
// 	var dir = `${__dirname}/../../images/${req.params.image}`
// 	if (!fs.existsSync(dir)){
// 		res.status(404).json(errorResponse(new Error('Image Not Found')))
// 	}

// 	const type = mime[path.extname(dir).slice(1)] || 'text/plain'
// 	res.set('Content-Type', type)

// 	var stream = fs.createReadStream(dir)
// 	stream.on('open', function () {
// 		res.set('Content-Type', type)
// 		stream.pipe(res)
// 	})
// 	stream.on('error', function () {
// 		res.set('Content-Type', mime.json)
// 		res.status(404).json(errorResponse(new Error('Image Not Found')))
// 	})

// })

module.exports = router
