const express = require('express');
const router = express.Router();

const Hotel = require('../models/hotel');

// CLOUDINARY
const multer = require('multer');
const storage = require('../cloudinary/index');
const upload = multer({ storage });
// MAPBOX
const geocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = geocoding({ accessToken: process.env.MAPBOX_TOKEN });

router.get('/', (req, res) => {
	res.render('landing', { page: 'Home - StaySense' });
});
router.get('/contact', (req, res) => {
	res.render('contact', { page: 'Contact' });
});
router.post('/contact', async (req, res) => {
	try {
		res.send(req.body);
	} catch (error) {
		res.send(error);
	}
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
router.post('/hotels', upload.array('image'), async (req, res) => {
	try {
		const newHotel = new Hotel(req.body.hotel);
		// req.files -> array -> index: path
		for (let img of req.files) {
			newHotel.image.push(img.path);
		}
		const query = req.body.hotel.address;
		const result = await geocodingClient
			.forwardGeocode({
				query,
				limit: 1
			})
			.send();
		newHotel.location = result.body.features[0].geometry;
		await newHotel.save();
		res.redirect(`/hotels/${newHotel._id}`);
	} catch (error) {
		res.send(error);
	}
});
router.get('/hotels/:id', async (req, res) => {
	try {
		const hotel = await Hotel.findById(req.params.id).populate('reviews');
		const reviews = hotel.reviews;
		res.render('hotels/show', { reviews, hotel, page: 'Hotel Details - StaySense' });
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
		const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body.hotel);
		const query = req.body.hotel.address;
		const result = await geocodingClient
			.forwardGeocode({
				query,
				limit: 1
			})
			.send();
		hotel.location = result.body.features[0].geometry;
		await hotel.save();
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
