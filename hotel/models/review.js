const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
	title: String,
	body: String,
	user: String,
	stars: {
		type: Number,
		max: 5,
		min: 1
	}
});

module.exports = mongoose.model('review', reviewSchema);
