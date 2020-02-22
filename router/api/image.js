const express = require('express')
const router = express.Router()
const passport = require('passport')
// Controller
const ImageController = require('../../src/Image/ImageController')
const { passUpload } = require('../../middleware/imageUpload')

/**
 * @doc : Get User Profile
 * @desc : Using Middlware JWT to Authenticate
 * @route /api/v{Num}/image/
 */

router.post('/',
	passport.authenticate('jwt', {session: false}),
	passUpload,
	ImageController.CREATE_IMAGE
)

/**
 * @doc : Get User Profile
 * @desc : Using Middlware JWT to Authenticate
 * @route /api/v{Num}/image/
 */

router.get('/',
	passport.authenticate('jwt', {session: false}),
	ImageController.GET_ALL_IMAGES
)

/**
 * @doc : Get Images By User Jwt
 * @desc : Using Middlware JWT to Authenticate
 * @route /api/v{Num}/image/user
 */
router.get('/user',
	passport.authenticate('jwt', {session: false}),
	ImageController.GET_IMAGE_BY_USER
)

module.exports = router
