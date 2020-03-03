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

/**
 *
 */
router.put('/:id',
	passport.authenticate('jwt', {session: false}),
	BlogController.UPDATE_BLOG_BY_ID
)

/**
 * Get ALl Blos
 */
router.get('/', BlogController.GET_ALL_BLOG)
router.get('/:id', BlogController.GET_BLOG_BY_ID)

// Get Project By User Id
router.get('/userId/:userId', BlogController.GET_BLOG_BY_USER_ID)

module.exports = router
