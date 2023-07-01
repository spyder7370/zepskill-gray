const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const Hotel = require('../models/hotel');
// CUD
// new
router.get('/hotels/:id/reviews/new', (req, res) => {
	res.render('reviews/new', { hotelId: req.params.id, page: 'New Review' });
});
// create
router.post('/hotels/:id/reviews', async (req, res) => {
	try {
		const newReview = new Review(req.body.review);
		await newReview.save();
		const hotel = await Hotel.findById(req.params.id);
		hotel.reviews.push(newReview);
		hotel.totalRatings++;
		hotel.sumOfRatings += parseInt(req.body.review.stars, 10);
		hotel.averageRating = hotel.sumOfRatings / hotel.totalRatings;
		await hotel.save();
		res.redirect(`/hotels/${req.params.id}`);
	} catch (error) {
		res.send(error);
	}
});
// edit
router.get('/hotels/:id/reviews/:reviewId/edit', async (req, res) => {
	try {
		const review = await Review.findById(req.params.reviewId);
		res.render('reviews/edit', { hotelId: req.params.id, review, page: 'Edit Review' });
	} catch (error) {
		res.send(error);
	}
});
// update
router.patch('/hotels/:id/reviews/:reviewId', async (req, res) => {
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
router.delete('/hotels/:id/reviews/:reviewId', async (req, res) => {
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
