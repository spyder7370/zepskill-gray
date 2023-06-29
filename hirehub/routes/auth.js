const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/login', authController.loginForm);
router.post(
	'/login',
	passport.authenticate('local', {
		failureRedirect: '/login',
		failureFlash: true
	}),
	authController.loginLogic
);
router.get('/signup', authController.registerForm);
router.post('/signup', authController.registerLogic);
router.get('/logout', authController.logoutUser);

module.exports = router;
