const mongoose = require('mongoose')
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
		default: 'User'
	}
}, {
	timestamps: true,
})

// Create a User model for the schema
userSchema.index({'skills': 1}, {index: true})
const User = mongoose.model('User', userSchema)
// Export User
module.exports = User
