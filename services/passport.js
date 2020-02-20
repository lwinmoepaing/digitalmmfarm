//passport.js
const User = require('../src/User/UserModel')
const passportJWT = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const config = require('../config')
const bcrypt = require('bcrypt')
// const { DEEP_JSON_COPY } = require('../lib/helper')

const JWTStrategy   = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

module.exports = (passport) => {

	const JWT_MANAGE = async function (jwtPayload, cb) {
		// console.log('Jwt Payload', jwtPayload)
		return jwtPayload._id ? cb(null, jwtPayload) : cb(new Error ('Hehe2'), null, {message: 'Aww'})
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

	/**
	 * @desc: When User Login ( Authentication )
	 * @route 'api/v{number}/auth'
	 * @method POST
	 */
	const PassportManage = async (email, password, cb) => {
		try {
			const user = await User.findOne({ email })
			if (!user) return cb(new Error('Not Found User'), false,)

			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) throw err
				if(isMatch) {
					return cb(null, user)
				} else {
					return cb(new Error('Incorrect Password'), false)
				}
			})
		} catch (e) {
			cb(new Error('Incorrect email or password.'), false)
		}
	}

	passport.use(new LocalStrategy(PassportLocalStrategy, PassportManage))

}
