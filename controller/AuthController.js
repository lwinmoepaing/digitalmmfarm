const User = require('../model/User')
const bcrypt = require('')
/**
 *
 */

module.exports.CREATE_USER = async (req, res) => {
	const user = new User()
	user.name = 'Hehehe'
	user.email = 'test'+Math.random()+'@gmail.com'
	user.skill = ['soccer', 'hack']
	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)
	user.save()
	res.status(200).json(user)
}
