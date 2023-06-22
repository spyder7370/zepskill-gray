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
		req.flash('error', 'Something went wrong while fetching all jobs, please try again later');
		console.log(error);
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
		req.flash('success', 'Successfully posted a job');
		res.redirect('/jobs');
	} catch (error) {
		req.flash('error', 'Something went wrong while creating a job, please try again later');
		console.log(error);
		res.redirect('/jobs');
	}
});

// ! SHOW ROUTE
router.get('/jobs/:id', async (req, res) => {
	try {
		const foundJob = await Job.findById(req.params.id);
		res.render('jobs/show', { foundJob });
	} catch (error) {
		req.flash('error', 'Something went wrong while fetching a job, please try again later');
		console.log(error);
		res.redirect('/jobs');
	}
});

// ! EDIT ROUTE
router.get('/jobs/:id/edit', checkLoggedIn, checkAdmin, async (req, res) => {
	try {
		const foundJob = await Job.findById(req.params.id);
		res.render('jobs/edit', { foundJob });
	} catch (error) {
		req.flash('error', 'Something went wrong while fetching a job, please try again later');
		console.log(error);
		res.redirect('/jobs');
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
		req.flash('success', 'Successfully updated the job');
		res.redirect('/jobs');
	} catch (error) {
		req.flash('error', 'Something went wrong while updating a job, please try again later');
		console.log(error);
		res.redirect('/jobs');
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
		req.flash('success', 'Successfully deleted the job');
		res.redirect('/jobs');
	} catch (error) {
		req.flash('error', 'Something went wrong while deleting a job, please try again later');
		console.log(error);
		res.redirect('/jobs');
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
		req.flash('success', 'status is successfully changed');
		res.redirect(`/jobs/${id}`);
	} catch (error) {
		req.flash('error', 'Something went wrong while changing status of a job, please try again later');
		console.log(error);
		res.redirect('/jobs');
	}
});

module.exports = router;
