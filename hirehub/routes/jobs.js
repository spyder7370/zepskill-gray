const express = require('express');
const router = express.Router();

// ! MIDDLEWAreturn res
const { checkLoggedIn, checkAdmin } = require('../middlewares/index');
const jobController = require('../controllers/jobs');

// ! INDEX ROUTE
router.get('/jobs', jobController.jobIndex);
router.get('/jobs/search', jobController.jobFilter);
// ! NEW ROUTE
router.get('/jobs/new', checkLoggedIn, checkAdmin, jobController.jobNewForm);
// ! CREATE ROUTE
router.post('/jobs', checkLoggedIn, checkAdmin, jobController.jobCreate);
// ! SHOW ROUTE
router.get('/jobs/:id', jobController.jobShow);
// ! EDIT ROUTE
router.get('/jobs/:id/edit', checkLoggedIn, checkAdmin, jobController.jobEditForm);
// ! UPDATE ROUTE
router.patch('/jobs/:id', checkLoggedIn, checkAdmin, jobController.jobUpdate);
// ! DELETE ROUTE
router.delete('/jobs/:id', checkLoggedIn, checkAdmin, jobController.jobDelete);
// ! changing job status
router.get('/jobs/:id/status', checkLoggedIn, checkAdmin, jobController.changeJobStatus);
// ! apply to jobs
router.get('/jobs/:id/apply/:userId', checkLoggedIn, jobController.jobApply);
// ! job test
router.get('/jobs/:id/test', checkLoggedIn, jobController.jobTestForm);
router.post('/jobs/:id/test', checkLoggedIn, jobController.jobTestLogic);

module.exports = router;
