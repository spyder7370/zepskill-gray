const Review = require('../models/review');
const Hotel = require('../models/hotel');

module.exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'you must be logged in to do that');
	res.redirect('/login');
};

module.exports.checkReviewUser = async (req, res, next) => {
	try {
		const review = await Review.findById(req.params.reviewId);
		if (review.user.equals(req.user._id)) return next();
		req.flash('error', 'you cannot do that');
		res.redirect('back');
	} catch (error) {
		req.flash('error', 'something went wrong');
		console.log(error);
		res.redirect('back');
	}
};

module.exports.checkHotelAuthor = async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		if (hotel.author.equals(req.user._id)) return next();
		req.flash('error', 'you cannot do that');
		res.redirect('back');
	} catch (error) {
		req.flash('error', 'something went wrong');
		console.log(error);
		res.redirect('back');
	}
};
