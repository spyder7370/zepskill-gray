const express = require('express'),
	passport = require('passport');

const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/auth');

router.get('/login', authController.loginForm);
router.post(
	'/login',
	passport.authenticate('local', {
		failureFlash: true,
		failureRedirect: '/login'
	}),
	authController.loginUser
);
router.get('/register', authController.registerForm);
router.post('/register', authController.registerUser);
router.get('/logout', authController.logoutUser);

module.exports = router;
