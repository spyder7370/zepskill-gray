const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');

// ! MIDDLEWARES
const { checkLoggedIn, checkAdmin } = require('../middlewares/index');

router.get('/notifications', async (req, res) => {
	try {
		const allNotifs = await Notification.find();
		res.render('notifications/index', { allNotifs });
	} catch (error) {
		res.send(error);
	}
});

router.get('/notifications/new', checkLoggedIn, checkAdmin, (req, res) => {
	res.render('notifications/new');
});

router.post('/notifications', checkLoggedIn, checkAdmin, async (req, res) => {
	try {
		const newNotif = new Notification({
			title: req.body.title,
			body: req.body.body,
			author: req.body.author
		});
		await newNotif.save();
		res.redirect('/notifications');
	} catch (error) {
		res.send(error);
	}
});

router.get('/notifications/:id/edit', checkLoggedIn, checkAdmin, async (req, res) => {
	try {
		const foundNotif = await Notification.findById(req.params.id);
		res.render('notifications/edit', { foundNotif });
	} catch (error) {
		res.send(error);
	}
});

router.patch('/notifications/:id', checkLoggedIn, checkAdmin, async (req, res) => {
	try {
		const notifData = {
			title: req.body.title,
			body: req.body.body,
			author: req.body.author
		};
		await Notification.findByIdAndUpdate(req.params.id, notifData);
		res.redirect('/notifications');
	} catch (error) {
		res.send(error);
	}
});

router.delete('/notifications/:id', checkLoggedIn, checkAdmin, async (req, res) => {
	try {
		await Notification.findByIdAndDelete(req.params.id);
		res.redirect('/notifications');
	} catch (error) {
		res.send(error);
	}
});

module.exports = router;
