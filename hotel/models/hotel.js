const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: String,
	address: String,
	description: String,
	image: [ String ],
	createdAt: {
		type: Date,
		default: Date.now()
	},
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'review'
		}
	]
});

module.exports = mongoose.model('hotel', hotelSchema);
