const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const moment = require('moment-timezone')


const accessLogStream = fs.createWriteStream(
	path.join(__dirname, '../', 'logs', 'access.log'),
	{ flags: 'a' }
)

morgan.token('date', () => {
	return moment().tz('Asia/Yangon').format()
})

morgan.token('user', (req) => {
	return  req.user ? `UserId:${req.user._id} Name:"${req.user.name}"`: '"Guest"'
})

morgan.format('myformat', '[:date[clf]] :method ":url", Status :status, ContentLength :res[content-length] - :response-time ms, :user')

module.exports = morgan('myformat', { format: 'default', stream: accessLogStream })
