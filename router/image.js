const express = require('express')
const router = express.Router()
const fs = require('fs')
const { errorResponse } = require('../lib/responseHandler')
/**
 * @doc : Fetching Image File
 * @route /api/v{Num}/image
 */
router.get('/:image', (req, res) => {
	var dir = `${__dirname}/../public/images/${req.params.image}`
	if (!fs.existsSync(dir)){
		res.status(400).json(errorResponse(new Error('Hahaha')))
	}

	res.status(200).json({success: true})
})

module.exports = router
