const express = require('express');
const router = express.Router();

const Hotel = require('../models/hotel');

router.get('/', (req, res) => {
	res.render('landing', { page: 'Home - StaySense' });
});

router.get('/hotels', async (req, res) => {
	try {
		const hotels = await Hotel.find();
		res.render('hotels/index', { hotels, page: 'All Hotels - StaySense' });
	} catch (error) {
		res.send(error);
	}
});
router.get('/hotels/new', (req, res) => {
	res.render('hotels/new', { page: 'New Hotel - StaySense' });
});
router.post('/hotels', async (req, res) => {
	try {
		const newHotel = new Hotel(req.body.hotel);
		await newHotel.save();
		res.redirect(`/hotels/${newHotel._id}`);
	} catch (error) {
		res.send(err);
	}
});
router.get('/hotels/:id', async (req, res) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		res.render('hotels/show', { hotel, page: 'Hotel Details - StaySense' });
	} catch (error) {
		res.send(error);
	}
});
router.get('/hotels/:id/edit', async (req, res) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		res.render('hotels/edit', { hotel, page: 'Edit Hotel - StaySense' });
	} catch (error) {
		res.send(error);
	}
});
router.patch('/hotels/:id', async (req, res) => {
	try {
		await Hotel.findByIdAndUpdate(req.params.id, req.body.hotel);
		res.redirect(`/hotels/${req.params.id}`);
	} catch (error) {
		res.send(error);
	}
});
router.delete('/hotels/:id', async (req, res) => {
	try {
		await Hotel.findByIdAndRemove(req.params.id);
		res.redirect('/hotels');
	} catch (error) {
		res.send(error);
	}
});

module.exports = router;
