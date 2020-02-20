//passport.js
const User = require('../data/User.json')
const passportJWT = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const config = require('../config')
const { DEEP_JSON_COPY } = require('../lib/helper')

const JWTStrategy   = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

module.exports = (passport) => {

	const JWT_MANAGE = async function (jwtPayload, cb) {
		console.log('Jwt Payload', jwtPayload)
		return jwtPayload._id ? cb(null, jwtPayload) : cb(new Error ('Hehe2'))
	}

	const PassportJWTStrategy = ({
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey   : config.JWT_SECRET
	})

	passport.use(new JWTStrategy(PassportJWTStrategy, JWT_MANAGE))

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
			const getUser = DEEP_JSON_COPY(user)
			// Don't Wanna Show User Password
			delete getUser.password
			return cb(null, getUser, {message: 'Logged In Successfully'})
		} else {
			return cb(new Error ('Hehe'))
		}
	}

	passport.use(new LocalStrategy(PassportLocalStrategy, PassportManage))

}
