const Blog = require('./BlogModel')
const { successResponse, errorResponse } = require('../../lib/responseHandler')
const { Blog_Create_Validator } = require('./BlogValidator')
const { MANAGE_ERROR_MESSAGE } = require('../../lib/helper')
/**
 *
 */
module.exports.CREATE_BLOG = async (req, res) => {

	const { error } = Blog_Create_Validator(req)

	if(error) {
		res.status(400).json( MANAGE_ERROR_MESSAGE(error) )
		return
	}


	try {
		const blog = new Blog({
			...req.body,
			author: req.user._id
		})
		await blog.save()
		res.status(200).json(successResponse(blog))
	} catch (e) {
		res.status(400).json(errorResponse(e))
	}
}
