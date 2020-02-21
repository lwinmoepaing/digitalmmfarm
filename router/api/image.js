const express = require('express')
const router = express.Router()
const passport = require('passport')
// Controller
const ImageController = require('../../src/Image/ImageController')


/**
 * @doc : Get User Profile
 * @desc : Using Middlware JWT to Authenticate
 * @route /api/v{Num}/auth/me
 */

router.post('/', passport.authenticate('jwt', {session: false}), ImageController.CREATE_IMAGE)

module.exports = router
