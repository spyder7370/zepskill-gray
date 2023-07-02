const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/login', (req, res) => {
	res.render('users/login', { page: 'Login' });
});
router.post(
	'/login',
	passport.authenticate('local', {
		failureFlash: true,
		failureRedirect: '/login'
	}),
	(req, res) => {
		res.redirect('/hotels');
	}
);
router.get('/register', (req, res) => {
	res.render('users/register', { page: 'Register' });
});
router.post('/register', async (req, res) => {
	try {
		const userData = new User(req.body.user);
		const registeredUser = await User.register(userData, req.body.password);
		req.login(registeredUser, (error) => {
			if (error) {
				return res.send(error);
			}
			res.redirect('/hotels');
		});
	} catch (error) {
		res.send(error);
	}
});
router.get('/logout', (req, res) => {
	req.logout((error) => {
		if (error) return res.send(error);
		res.redirect('/hotels');
	});
});

module.exports = router;
