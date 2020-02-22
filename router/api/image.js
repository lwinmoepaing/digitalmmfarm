const express = require('express')
const router = express.Router()
const passport = require('passport')
// Controller
const ImageController = require('../../src/Image/ImageController')
const { passUpload } = require('../../middleware/imageUpload')

/**
 * @doc : Get User Profile
 * @desc : Using Middlware JWT to Authenticate
 * @route /api/v{Num}/auth/me
 */

router.post('/',
	passport.authenticate('jwt', {session: false}),
	passUpload,
	ImageController.CREATE_IMAGE
)

/**
 * @doc : Get User Profile
 * @desc : Using Middlware JWT to Authenticate
 * @route /api/v{Num}/auth/me
 */

router.get('/',
	passport.authenticate('jwt', {session: false}),
	ImageController.GET_ALL_IMAGES
)

module.exports = router
