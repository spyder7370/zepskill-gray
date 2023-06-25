const mongoose = require('mongoose');
const resumeSchema = new mongoose.Schema({
	name: String,
	phone: String,
	linkedIn: String,
	experience: [
		{
			companyName: String,
			startDate: String,
			endDate: String,
			designation: String,
			description: String
		}
	],
	projects: [
		{
			title: String,
			description: String,
			link: String
		}
	],
	education: [
		{
			title: String,
			university: String,
			startDate: String,
			endDate: String,
			result: String
		}
	],
	achievements: String
});
module.exports = mongoose.model('resume', resumeSchema);
