const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema } = mongoose

const messageShema = new Schema({
	name: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
})

/**
 * Create Blog Schema
 * @doc : Blog Scalable Schema
 */
const blogSchema = new Schema({
	headImg: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true,
		index: true
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	comments: [messageShema],
	youtubeUrl: {
		type: String,
		required: true,
	},
	youtubeCaption: {
		type: String,
		required: true
	},
	deletedAt: {
		type: Date,
		default: null,
		index: true
	}
}, {
	timestamps: true,
})

// Plugin Paginate
blogSchema.plugin(mongoosePaginate)

const Blog = mongoose.model('Blog', blogSchema)
// Export Blog
module.exports = Blog
