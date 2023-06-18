const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const Notification = require('../models/notification');

// ! INDEX ROUTE
router.get('/jobs', async (req, res) => {
	try {
		console.log(req.user);
		let pageNo = 1;
		if (req.query.page) pageNo = req.query.page;
		const allJobs = await Job.paginate(
			{},
			{
				page: pageNo,
				limit: 10
			}
		);
		// console.log(allJobs);
		res.render('jobs/index', { allJobs });
		// res.render('index', { allJobs });
	} catch (error) {
		res.send(error);
	}
});

// ! NEW ROUTE
router.get('/jobs/new', (req, res) => {
	res.render('jobs/new');
});

// ! CREATE ROUTE
router.post('/jobs', async (req, res) => {
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
		res.send(error);
	}
});

// ! EDIT ROUTE
router.get('/jobs/:id/edit', async (req, res) => {
	try {
		const foundJob = await Job.findById(req.params.id);
		res.render('jobs/edit', { foundJob });
	} catch (error) {
		res.send(error);
	}
});

// ! UPDATE ROUTE
router.patch('/jobs/:id', async (req, res) => {
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
		res.redirect('/jobs');
	} catch (error) {
		res.send(error);
	}
});

// ! DELETE ROUTE
router.delete('/jobs/:id', async (req, res) => {
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

router.get('/seed', async (req, res) => {
	try {
		for (let i = 0; i < 1000; ++i) {
			const newJob = new Job({
				postName: 'sde',
				companyName: 'amazon',
				ctc: 30,
				location: 'gurgaon',
				cgpa: 7,
				description: 'adfadsfasdfasdf',
				numberOfPositions: 50
			});
			await newJob.save();
		}
		res.send('ok');
	} catch (error) {
		res.send(error);
	}
});

module.exports = router;

/*
 1 - 10 result -> limit = 10, skip = 0,
 results 11-20 -> limit = 20, skip = 10
 1-20 - 1-10 => 11-20
 limit = 30, skip = 20 => 21-30
 model.find()
 model.paginate()
*/
