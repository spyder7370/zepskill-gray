const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const Notification = require('../models/notification');

// ! MIDDLEWARES
const { checkLoggedIn, checkAdmin } = require('../middlewares/index');

// ! INDEX ROUTE
router.get('/jobs', async (req, res) => {
	try {
		let pageNo = 1;
		if (req.query.page) pageNo = req.query.page;
		const allJobs = await Job.paginate(
			{},
			{
				page: pageNo,
				limit: 10
			}
		);
		res.render('jobs/index', { allJobs });
	} catch (error) {
		req.flash('error', 'there is something wrong');
		res.redirect('/');
	}
});

// ! NEW ROUTE
router.get('/jobs/new', checkLoggedIn, checkAdmin, (req, res) => {
	res.render('jobs/new');
});

// ! CREATE ROUTE
router.post('/jobs', checkLoggedIn, checkAdmin, async (req, res) => {
	try {
		const newJob = new Job({
			postName: req.body.postName,
			companyName: req.body.companyName,
			ctc: req.body.ctc,
			location: req.body.location,
			cgpa: req.body.cgpa,
			description: req.body.description,
			numberOfPositions: req.body.numberOfPositions
		});
		await newJob.save();
		const newNotif = new Notification({
			title: `New ${newJob.postName} opening`,
			body: `${newJob.companyName} just posted a new job`,
			author: newJob.companyName
		});
		await newNotif.save();
		res.redirect('/jobs');
	} catch (error) {
		res.send(error);
	}
});

// ! SHOW ROUTE
router.get('/jobs/:id', async (req, res) => {
	try {
		const foundJob = await Job.findById(req.params.id);
		res.render('jobs/show', { foundJob });
	} catch (error) {
		req.flash('error', 'there is something wrong');
		res.redirect('/jobs');
	}
});

// ! EDIT ROUTE
router.get('/jobs/:id/edit', checkLoggedIn, checkAdmin, async (req, res) => {
	try {
		const foundJob = await Job.findById(req.params.id);
		res.render('jobs/edit', { foundJob });
	} catch (error) {
		res.send(error);
	}
});

// ! UPDATE ROUTE
router.patch('/jobs/:id', checkLoggedIn, checkAdmin, async (req, res) => {
	try {
		const jobData = {
			postName: req.body.postName,
			companyName: req.body.companyName,
			ctc: req.body.ctc,
			location: req.body.location,
			cgpa: req.body.cgpa,
			description: req.body.description,
			numberOfPositions: req.body.numberOfPositions
		};
		await Job.findByIdAndUpdate(req.params.id, jobData);
		const newNotif = new Notification({
			title: `${jobData.postName} opening edited`,
			body: `${jobData.companyName} just edit their job`,
			author: jobData.companyName
		});
		await newNotif.save();
		req.flash('success', 'update is done');
		res.redirect('/jobs');
	} catch (error) {
		res.send(error);
	}
});

// ! DELETE ROUTE
router.delete('/jobs/:id', checkLoggedIn, checkAdmin, async (req, res) => {
	try {
		const jobData = await Job.findById(req.params.id);
		await Job.findByIdAndDelete(req.params.id);
		const newNotif = new Notification({
			title: `${jobData.postName} opening deleted`,
			body: `${jobData.companyName} just deleted their job`,
			author: jobData.companyName
		});
		await newNotif.save();
		res.redirect('/jobs');
	} catch (error) {
		res.send(error);
	}
});

// ! changing job status
router.get('/jobs/:id/status', checkLoggedIn, checkAdmin, async (req, res) => {
	try {
		const { type } = req.query,
			{ id } = req.params;
		if (!type) return res.redirect(`/jobs/${id}`);
		if (![ 'active', 'over', 'interview' ].includes(type)) type = 'active';
		const job = await Job.findByIdAndUpdate(id, { status: type });
		res.redirect(`/jobs/${id}`);
	} catch (error) {
		res.send(error);
	}
});

module.exports = router;
