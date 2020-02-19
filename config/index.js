
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../.env') })

const env = process.env.NODE_ENV || 'development'
console.log(env)

const config = {
	development: {
		API_VERSION: '/api/v1',
		API_KEY: process.env.API_KEY,
	},
	production: {
		API_VERSION: '/api/v1',
		API_KEY: process.env.API_KEY,
	}
}
module.exports = config[env]
