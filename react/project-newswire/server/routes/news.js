const express = require('express');
const router = express.Router();

const News = require('../models/news');
const { sendEmail } = require('../config/email');

router.get('/news', async (req, res) => {
	try {
		const news = await News.find();
		res.json(news);
	} catch (error) {
		console.log(error);
	}
});

// router.get('/news/new', async (req, res) => {
// 	res.render('new');
// });
router.post('/news', async (req, res) => {
	try {
		const newNews = new News(req.body.news);
		await newNews.save();
		res.json('ok');
	} catch (error) {
		console.log(error);
	}
});

router.get('/news/:id', async (req, res) => {
	try {
		const news = await News.findById(req.params.id);
		res.json(news);
	} catch (error) {
		console.log(error);
	}
});

router.get('/news/:id/edit', async (req, res) => {
	try {
		const news = await News.findById(req.params.id);
		res.json(news);
	} catch (error) {
		console.log(error);
	}
});

router.patch('/news/:id', async (req, res) => {
	try {
		await News.findByIdAndUpdate(req.params.id, req.body.news);
		res.json('ok');
	} catch (error) {
		console.log(error);
	}
});

router.delete('/news/:id', async (req, res) => {
	try {
		await News.findByIdAndRemove(req.params.id);
		res.json('ok');
	} catch (error) {
		console.log(error);
	}
});

router.post('/contact', async (req, res) => {
	try {
		console.log(req.body);
		const userObj = {
			email: req.body.email,
			subject: req.body.subject,
			content: req.body.content
		};
		await sendEmail(userObj);
		res.json('ok');
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
