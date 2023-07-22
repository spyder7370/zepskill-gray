const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
	title: String,
	content: String,
	author: String,
	image: String,
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('news', newsSchema);
