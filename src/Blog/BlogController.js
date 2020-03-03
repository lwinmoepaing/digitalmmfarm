const Blog = require('./BlogModel')
const { successResponse, errorResponse } = require('../../lib/responseHandler')
const { Blog_Create_Validator, Blog_Update_Validator } = require('./BlogValidator')
const { MANAGE_ERROR_MESSAGE, IS_VALID_ID, DEEP_JSON_COPY} = require('../../lib/helper')
/**
 * Create Blog
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

/**
 * Edit Blog
 */

module.exports.UPDATE_BLOG_BY_ID = async (req, res) => {
	const { id = null } = req.params
	const { error: idError } = IS_VALID_ID(id)

	// Is Not Valid Error
	if (idError) {
		console.log('Incoming Error1')
		res.status(400).json(MANAGE_ERROR_MESSAGE(idError))
		return
	}

	// Project Update Error
	const {error, value} = await Blog_Update_Validator(req)
	if(error) {
		console.log('Incoming Error2')
		res.status(400).json( MANAGE_ERROR_MESSAGE(error) )
		return
	}

	try {
		console.log('Win Lar1 ', id)
		const blog = await Blog.findById(id)
		if(!blog) {
			console.log('Incoming Error3')
			throw new Error('Blog Not Found')
		}

		// If User Update [Own/Self Project]
		if(DEEP_JSON_COPY(blog.author) === DEEP_JSON_COPY(req.user._id)) {
			console.log('Win Lar')
			const oldData = await Blog.findByIdAndUpdate(id, value)
			const data = {
				...DEEP_JSON_COPY(oldData),
				...value
			}
			res.status(200).json(successResponse(data, 'Successfully Updated'))
			return
		}

	} catch (e) {

		res.status(400).json(errorResponse(e))
	}


}
