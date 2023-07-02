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
	],
	sumOfRatings: {
		type: Number,
		default: 0
	},
	averageRating: {
		type: Number,
		default: 0
	},
	totalRatings: {
		type: Number,
		default: 0
	},
	location: {
		type: String,
		coordinates: [ Number ]
	}
});

module.exports = mongoose.model('hotel', hotelSchema);
