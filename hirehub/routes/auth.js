const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

router.get('/login', (req, res) => {
	res.render('users/login');
});

router.post(
	'/login',
	passport.authenticate('local', {
		failureRedirect: '/login',
		failureFlash: true
	}),
	(req, res) => {
		req.flash('success', 'Welcome back user');
		res.redirect('/jobs');
	}
);

router.get('/signup', (req, res) => {
	res.render('users/signup');
});

router.post('/signup', async (req, res) => {
	try {
		const newUser = new User({
			username: req.body.username,
			cgpa: req.body.cgpa,
			gender: req.body.gender,
			phone: req.body.phone,
			dob: req.body.dob
		});
		let registeredUser = await User.register(newUser, req.body.password);
		req.login(registeredUser, function(error) {
			if (error) {
				req.flash('error', 'Something went wrong while signing you up, please try again later');
				console.log(error);
				res.redirect('/jobs');
			}
			req.flash('success', 'Registration successful');
			res.redirect('/jobs');
		});
	} catch (error) {
		req.flash('error', 'Something went wrong while signing you up, please try again later');
		console.log(error);
		res.redirect('/jobs');
	}
});

router.get('/logout', (req, res) => {
	req.logout(function(error) {
		if (error) {
			req.flash('error', 'Something went wrong while logging you out, please try again later');
			console.log(error);
			res.redirect('/jobs');
		}
		req.flash('success', 'Successfully logged out');
		res.redirect('/jobs');
	});
});

module.exports = router;
