const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
// 1. schema
// 2. model
// 3. export
// use -> model -> queries

const jobSchema = new mongoose.Schema({
	postName: {
		type: String,
		required: [ true, 'You must enter the name of post' ],
		default: 'SDE',
		enum: [ 'SDE', 'analyst', 'ui', 'hr', 'manager' ]
	},
	companyName: {
		type: String,
		required: true,
		default: 'Name not given'
	},
	ctc: {
		type: Number,
		required: true
	},
	location: String,
	cgpa: {
		type: Number,
		required: true,
		min: 0,
		max: [ 10, 'Maximum allowed value for cgpa is 10' ]
	},
	description: String,
	numberOfPositions: Number
});
jobSchema.plugin(mongoosePaginate);
// module.exports = mongoose.model('job', jobSchema);
const jobModel = mongoose.model('job', jobSchema);
module.exports = jobModel;