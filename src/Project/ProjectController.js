const User = require('../User/UserModel')
const Project = require('./ProjectModel')
const { PAGINATE_LABELS } = require('../../config')
const { successResponse, errorResponse } = require('../../lib/responseHandler')
const { MANAGE_ERROR_MESSAGE, IS_VALID_ID, DEEP_JSON_COPY } = require('../../lib/helper')
const { Project_Create_Validator, Project_Update_Validator } = require('./ProjectValidator')


/**
 *
 */
module.exports.GET_ALL_PROJECT = async (req, res) => {
	const { page = 1 } = req.query
	const limit = 10
	const options = {
		// select: '_id title',
		sort: { createdAt: -1 },
		page,
		limit,
		customLabels: PAGINATE_LABELS
	}

	try {
		const projects = await Project.paginate({}, options)
		res.status(200).json(projects)
	} catch (e) {
		res.status(400).json(errorResponse(e))
	}
}


/**
 *
 */
module.exports.GET_PROJECT_FROM_FARMERS_STATUS = async (req, res) => {
	const { status = null } = await req.query
	const { page = 1 } = req.query
	const limit = 10
	const options = {
		sort: { createdAt: -1 },
		page,
		limit,
		customLabels: PAGINATE_LABELS,
		populate: {
			path: 'user',
			select: 'name email phone role skills image'
		}
	}

	const query = {
		status,
		projectCreateBy: 'Farmer'
	}

	const projects = await Project.paginate(query, options)
	res.status(200).json(projects)
}

/**
 *
 */
module.exports.GET_PROJECT_FROM_USERS_STATUS = async (req, res) => {
	const { status = null } = await req.query
	const { page = 1 } = req.query
	const limit = 10
	const options = {
		sort: { createdAt: -1 },
		page,
		limit,
		customLabels: PAGINATE_LABELS,
		populate: {
			path: 'user',
			select: 'name email phone role skills image'
		}
	}

	const query = {
		status,
		projectCreateBy: 'User'
	}

	const projects = await Project.paginate(query, options)
	res.status(200).json(projects)
}

/**
 * Get Project By User Id
 */
module.exports.GET_PROJECT_BY_USER_ID = async (req, res) => {
	const { userId = null } = req.params
	const { error } = IS_VALID_ID(userId)

	if (error) {
		res.status(400).json(MANAGE_ERROR_MESSAGE(error))
		return
	}

	const { page = 1 } = req.query
	const limit = 10
	const options = {
		sort: { createdAt: -1 },
		page,
		limit,
		customLabels: PAGINATE_LABELS
	}

	// Query Filters
	let query = { user: userId }
	if(req.query.status) { query.status = req.query.status }
	if(req.query.projectCategory) { query.projectCategory = req.query.projectCategory }

	try {
		const project = await Project.paginate(query, options)
		res.status(200).json(project)
	} catch (e) {
		res.status(400).json(errorResponse(e))
	}

}

/**
 * Check Expired Date And Set is Expired Or not
 */
module.exports.CHECK_EXPIRED_AND_SET = async (req, res) => {
	const today = new Date()
	today.setHours(0,0,0,0)
	const tomorrow = new Date(today)
	tomorrow.setDate(tomorrow.getDate() + 1)

	const query = {
		status: 'Pending',
		projectExpiredDate: { $lte: tomorrow }
	}

	const update = {
		status: 'Expired',
		isClosed: true
	}

	try {
		const projects = await Project.updateMany(query, update)
		res.status(200).json(
			{
				success: 'Successfully Get Expired Data',
				data: projects,
			}
		)
	} catch(e) {
		res.status(400).json(errorResponse(e))
	}
}

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
			.populate({
				path: 'assignedBy',
				select: 'name email phone '
			})
			.populate({
				path: 'acceptedBy',
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
 * Update Project By Id
 */
module.exports.UPDATE_PROJECT_BY_ID = async (req, res) => {
	const { id = null } = req.params
	const { error: idError } = IS_VALID_ID(id)

	// Is Not Valid Error
	if (idError) {
		res.status(400).json(MANAGE_ERROR_MESSAGE(idError))
		return
	}

	// Project Update Error
	const {error, value} = await Project_Update_Validator(req)
	if(error) {
		res.status(400).json( MANAGE_ERROR_MESSAGE(error) )
		return
	}

	try {
		const project = await Project.findById(id)

		if(!project) {
			throw new Error('Project Not Found')
		}

		// If User Update [Own/Self Project]
		if(DEEP_JSON_COPY(project.user) === DEEP_JSON_COPY(req.user._id)) {
			const oldData = await Project.findByIdAndUpdate(id, value)
			const data = {
				...DEEP_JSON_COPY(oldData),
				...value
			}
			res.status(200).json(successResponse(data, 'Successfully Updated'))
			return
		}

		// If Staff Or Admin
		if(req.user.role === 'Admin' || req.user.role === 'Staff') {
			const payloads = {
				...value
			}
			if(req.body.acceptedBy) {
				payloads.assignedBy = req.user._id
				payloads.isClosed = true
			}
			const oldData = await Project.findByIdAndUpdate(id, payloads)
			const data = {
				...DEEP_JSON_COPY(oldData),
				...payloads
			}
			res.status(200).json(successResponse(data, 'Successfully Updated'))
			return
		}

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

	if(req.user.role !== 'User' && req.user.role !== 'Farmer') {
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
