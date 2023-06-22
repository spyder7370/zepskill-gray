const express = require('express');
const router = express.Router();
const User = require('../models/user');

// ! MIDDLEWARES
const { checkLoggedIn, verifyUser } = require('../middlewares/index');

// CRUD -> show, edit, update
router.get('/users/:id', async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		res.render('users/show', { foundUser });
	} catch (error) {
		req.flash('error', 'Something went wrong while fetching a user, please try again later');
		console.log(error);
		res.redirect('/jobs');
	}
});

router.get('/users/:id/edit', checkLoggedIn, verifyUser, async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		res.render('users/edit', { foundUser });
	} catch (error) {
		req.flash('error', 'Something went wrong while fetching a user, please try again later');
		console.log(error);
		res.redirect('/jobs');
	}
});

router.patch('/users/:id', checkLoggedIn, verifyUser, async (req, res) => {
	try {
		const { id } = req.params;
		const userData = {
			cgpa: req.body.cgpa,
			gender: req.body.gender,
			dob: req.body.dob,
			phone: req.body.phone
		};
		await User.findByIdAndUpdate(id, userData);
		req.flash('success', 'Successfully updated a user');
		res.redirect(`/users/${id}`);
	} catch (error) {
		req.flash('error', 'Something went wrong while updating a user, please try again later');
		console.log(error);
		res.redirect(`/users/${req.params.id}`);
	}
});

module.exports = router;
