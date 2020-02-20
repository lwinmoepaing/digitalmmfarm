//require mongoose module
var mongoose = require('mongoose')


//require database URL from properties file
var { MONGO_URI } = require('../config')

//export this function and imported by server.js
module.exports =function(){

	const MONGO_OPTION = {
		useUnifiedTopology: true,
		useNewUrlParser: true
	}

	mongoose.connect(MONGO_URI, MONGO_OPTION)

	mongoose.connection.on('connected', function(){
		console.log('Mongoose default connection is open to ', MONGO_URI)
	})

	mongoose.connection.on('error', function(err){
		console.log('Mongoose default connection has occured '+err+' error')
	})

	mongoose.connection.on('disconnected', function(){
		console.log('Mongoose default connection is disconnected')
	})

	process.on('SIGINT', function(){
		mongoose.connection.close(function(){
			console.log('Mongoose default connection is disconnected due to application termination')
			process.exit(0)
		})
	})
}
