const express = require('express')
const router = express.Router()
const { successResponse } = require('../lib/responseHandler')

router.get('/', (req, res) => {
	res.json(successResponse('GET USER SUCCESS'))
})

module.exports = router
