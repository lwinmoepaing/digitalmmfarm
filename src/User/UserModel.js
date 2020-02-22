const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema } = mongoose
/**
 * Create User Schema
 * @doc : User Scalable Schema
 */
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		index: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true,
		index: true
	},
	birthDate: {
		type: String
	},
	skills: [
		{ type: String, index: true }
	],
	role: {
		type: String,
		enum: ['Admin', 'Staff', 'Farmer', 'User'],
		default: 'User',
		index: true
	},
	image: {
		type: String,
		default: '/profile/profile.jpg'
	}
}, {
	timestamps: true,
})

// Create a User model for the schema
userSchema.index({'skills': 1}, {index: true})

// Plugin Paginate
userSchema.plugin(mongoosePaginate)

const User = mongoose.model('User', userSchema)
// Export User
module.exports = User
