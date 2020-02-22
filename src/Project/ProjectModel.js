const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema } = mongoose

const miniUserSchema =	new Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	image: {
		type: String,
		default: ''
	}
})

/**
 * Create Project Schema
 * @doc : Project Scalable Schema
 */
const projectSchema = new Schema({
	headImg: {
		type: String,
		default: '/wallpaper/wallpaper.jpg'
	},
	title: {
		type: String,
		index: true,
		required: true
	},
	body: [String],

	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
		required: true,
	},
	attachmentImg: [ String ],

	// For Pending State
	projectDuration: {
		type: String,
		required: true
	},
	projectExpiredData: Date,
	// For Working State
	projectStartDate: Date,
	projectEndDate: Date,
	projectCategory: {
		type: String,
		enum: ['Agriculture ', 'AnimalHusbandry', 'Both'],
		index: true,
		required: true,
	},
	projectCreateBy: {
		type: String,
		enum: ['Farmer', 'User'],
		index: true,
		required: true,
	},

	// Status
	status: {
		type: String,
		enum: ['Pending', 'Reject', 'Expired', 'Working', 'Finished'],
		index: true,
		default: 'Pending',
		required: true
	},

	// Interested User Array
	intrestedUser: [miniUserSchema],

	// Contact User Array
	contactUsers: [miniUserSchema],

	// For Staffs
	assignedBy: {
		type: miniUserSchema,
	},
	acceptedBy: {
		type: miniUserSchema
	}
}, {
	timestamps: true,
})

// Plugin Paginate
projectSchema.plugin(mongoosePaginate)

const Project = mongoose.model('Project', projectSchema)
// Export Project
module.exports = Project
