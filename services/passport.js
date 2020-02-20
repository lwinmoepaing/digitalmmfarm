//passport.js
const User = require('../data/User.json')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const config = require('../config')

const JWTStrategy   = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt


const JWT_MANAGE = async function (jwtPayload, cb) {
	//find the user in db if needed
	const user = await User.find(user => user._id === jwtPayload._id)
	if(user) {
		return cb(null, user)
	} else {
		return cb(new Error ('Hehe2'))
	}
}

const PassportJWTStrategy = ({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey   : config.JWT_SECRET
})

passport.use( new JWTStrategy(PassportJWTStrategy, JWT_MANAGE))

/**
 * Locale Stragegy
 */

const PassportLocalStrategy = {
	usernameField: 'email',
	passwordField: 'password'
}

const PassportManage = async (email, password, cb) => {

	//this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
	const user = await User.find(user => user.name === email && user.password === password)
	if(!user) {
		return cb(null, false, {message: 'Incorrect email or password.'})
	} else if(user) {
		return cb(null, user, {message: 'Logged In Successfully'})
	} else {
		return cb(new Error ('Hehe'))
	}
}

passport.use(new LocalStrategy(PassportLocalStrategy, PassportManage))
