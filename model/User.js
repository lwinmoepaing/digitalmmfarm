const mongoose = require('mongoose')
const { Schema } = mongoose

const userSkill = new Schema({
	skills: {
		type: String
	}
})
/**
 * Create User Schema
 * @doc : User Scalable Schema
 */
const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	birthDate: {
		type: String,
	},
	skills: [
		userSkill
	]
})

// Create a User model for the schema
const User = mongoose.model('User', userSchema)
// Export User
module.exports = User
