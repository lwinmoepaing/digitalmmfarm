const User = require('../User/UserModel')
const Project = require('./ProjectModel')

const { successResponse, errorResponse } = require('../../lib/responseHandler')
const { MANAGE_ERROR_MESSAGE, IS_VALID_ID, DEEP_JSON_COPY } = require('../../lib/helper')
const { Project_Create_Validator } = require('./ProjectValidator')


/**
 *
 */


/**
 * Create Project
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
 * Get Project By ID
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
			.populate({
				path: 'contactUsers',
				select: 'name email phone'
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
 * Set Interested User Array
 */
module.exports.SET_PROJECT_INTERESTED = async (req, res) => {
	const { error } = IS_VALID_ID(req.params.projectId)

	if (error) {
		res.status(400).json(MANAGE_ERROR_MESSAGE(error))
		return
	}

	try {
		const project = await Project
			.findById(req.params.projectId)
			.select('interestedUsers')
		if(!project) {
			throw new Error('Not Found Project')
		}

		let interested = DEEP_JSON_COPY(project.interestedUsers)
		const isInclude = interested.includes(req.user._id)

		if(isInclude) {
			interested = interested.filter(id => id !== req.user._id)
		} else {
			interested.push(req.user._id)
		}

		await Project.findByIdAndUpdate(req.params.projectId, { interestedUsers: interested })
		res.status(200).json(successResponse({state: !isInclude}))

	} catch (e) {
		res.status(400).json(errorResponse(e))
	}
}

/**
 * Set Contact For Contact User Array
 */
module.exports.SET_PROJECT_CONTACT = async (req, res) => {
	const { error } = IS_VALID_ID(req.params.projectId)

	if (error) {
		res.status(400).json(MANAGE_ERROR_MESSAGE(error))
		return
	}

	if(req.user.role !== 'User' || req.user.role !== 'Farmer') {
		res.status(400).json(errorResponse(new Error(`You Are Not Allowed For Type:${req.user.role}`)))
		return
	}

	try {
		const project = await Project
			.findById(req.params.projectId)
			.select('contactUsers')
		if(!project) {
			throw new Error('Not Found Project')
		}

		let contact = DEEP_JSON_COPY(project.contactUsers)
		const isInclude = contact.includes(req.user._id)

		if(isInclude) {
			res.status(200).json(successResponse({state: true}, 'You Already Contact Man!!'))
			return
		}

		contact.push(req.user._id)
		await Project.findByIdAndUpdate(req.params.projectId, { contactUsers: contact })
		res.status(200).json(successResponse({state: true}, 'Successfully Contacted'))

	} catch (e) {

		res.status(400).json(errorResponse(e))
	}
}
