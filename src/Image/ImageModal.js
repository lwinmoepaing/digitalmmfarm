const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema } = mongoose
/**
 * Create User Schema
 * @doc : User Scalable Schema
 */
const imageSchema = new Schema({
	_id: {
		type: String,
		unique: true,
	},
	user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
	timestamps: true,
})

// Plugin Paginate
imageSchema.plugin(mongoosePaginate)

const User = mongoose.model('Image', imageSchema)
// Export User
module.exports = User
