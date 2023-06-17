const mongoose = require('mongoose');
const notifSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	body: String,
	author: String
});
module.exports = mongoose.model('notification', notifSchema);
