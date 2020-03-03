const express = require('express')
const router = express.Router()
const passport = require('passport')
// Controller
const BlogController = require('../../src/Blog/BlogController')

/**
 * @doc : Create Blog
 * @desc : Using Middlware JWT to Authenticate
 * @route /api/v{Num}/image/
 */

router.post('/',
	passport.authenticate('jwt', {session: false}),
	BlogController.CREATE_BLOG
)

module.exports = router
