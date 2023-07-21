const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
	title: String,
	content: String,
	author: String,
	image: String
});

module.exports = mongoose.model('news', newsSchema);
