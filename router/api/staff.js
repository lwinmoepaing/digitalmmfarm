const express = require('express')
const router = express.Router()
const passport = require('passport')

const ProjectController = require('../../src/Project/ProjectController')
/**
 * @doc : GET Dashboard Data
 * @desc : Using Middlware JWT to Authenticate
 * @route /api/v{Num}/auth/me
 */

router.get(
	'/dashboard',
	passport.authenticate('jwt', {session: false}),
	ProjectController.GET_STAFF_DASHBOARD_DATA
)


module.exports = router
