const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const Hotel = require('../models/hotel');
// CUD
const { isLoggedIn, checkReviewUser } = require('../middlewares/index');
// new
router.get('/hotels/:id/reviews/new', isLoggedIn, (req, res) => {
	res.render('reviews/new', { hotelId: req.params.id, page: 'New Review' });
});
// create
router.post('/hotels/:id/reviews', isLoggedIn, async (req, res) => {
	try {
		const newReview = new Review(req.body.review);
		newReview.user = req.user._id;
		await newReview.save();
		const hotel = await Hotel.findById(req.params.id);
		hotel.reviews.push(newReview);
		hotel.totalRatings++;
		hotel.sumOfRatings += parseInt(req.body.review.stars, 10);
		hotel.averageRating = hotel.sumOfRatings / hotel.totalRatings;
		await hotel.save();
		req.flash('success', 'posted a review');
		res.redirect(`/hotels/${req.params.id}`);
	} catch (error) {
		console.log(error);
		req.flash('error', 'cannot post review at the moment');
		res.redirect(`/hotels/${req.params.id}`);
	}
});
// edit
router.get('/hotels/:id/reviews/:reviewId/edit', isLoggedIn, checkReviewUser, async (req, res) => {
	try {
		const review = await Review.findById(req.params.reviewId);
		res.render('reviews/edit', { hotelId: req.params.id, review, page: 'Edit Review' });
	} catch (error) {
		res.send(error);
	}
});
// update
router.patch('/hotels/:id/reviews/:reviewId', isLoggedIn, checkReviewUser, async (req, res) => {
	try {
		const review = await Review.findById(req.params.reviewId);
		const hotel = await Hotel.findById(req.params.id);
		await Review.findByIdAndUpdate(req.params.reviewId, req.body.review);
		hotel.sumOfRatings -= parseInt(review.stars, 10);
		hotel.sumOfRatings += parseInt(req.body.review.stars);
		hotel.averageRating = hotel.sumOfRatings / hotel.totalRatings;
		await hotel.save();
		res.redirect(`/hotels/${req.params.id}`);
	} catch (error) {
		res.send(error);
	}
});
// delete
router.delete('/hotels/:id/reviews/:reviewId', isLoggedIn, checkReviewUser, async (req, res) => {
	try {
		const review = await Review.findById(req.params.reviewId);
		const hotel = await Hotel.findById(req.params.id);
		await Review.findByIdAndDelete(req.params.reviewId);
		hotel.sumOfRatings -= parseInt(review.stars, 10);
		hotel.totalRatings--;
		hotel.averageRating = hotel.sumOfRatings / hotel.totalRatings;
		await hotel.save();
		res.redirect(`/hotels/${req.params.id}`);
	} catch (error) {
		res.send(error);
	}
});
module.exports = router;
