const User = require('../User/UserModel')
const Project = require('./ProjectModel')

const { successResponse, errorResponse } = require('../../lib/responseHandler')
const { MANAGE_ERROR_MESSAGE, IS_VALID_ID } = require('../../lib/helper')
const { Project_Create_Validator } = require('./ProjectValidator')

/**
 *
 */
module.exports.CREATE_PROJECT = async (req, res) => {

	const { error } = Project_Create_Validator(req)

	if(error) {
		res.status(400).json( MANAGE_ERROR_MESSAGE(error) )
		return
	}

	const user = await User.findById(req.user._id)

	const projectCreateBy = user.role
	const statue = 'Pending'
	const payloads = {
		...req.body,
		projectCreateBy,
		statue,
		user: user._id
	}

	const project = new Project(payloads)
	await project.save()


	res.json(successResponse(project))
}

/**
 *
 */
module.exports.GET_PROJECT_BY_ID = async (req, res) => {
	const { error } = IS_VALID_ID(req.params.id)

	if (error) {
		res.status(400).json(MANAGE_ERROR_MESSAGE(error))
		return
	}

	try {
		const project = await Project
			.findById(req.params.id)
			.populate({
				path: 'user',
				select: 'name email phone role skills'
			})
		if(!project) {
			throw new Error('Not Found Project')
		}

		res.status(200).json(successResponse(project))
	} catch (e) {
		res.status(400).json(errorResponse(e))
	}
}

/**
 *
 */
module.exports.SET_PROJECT_INTERESTED = async (req, res) => {
	await console.log('Hehe')
}
