const express = require('express');
const router = express.Router();

const Hotel = require('../models/hotel');
const { isLoggedIn, checkHotelAuthor } = require('../middlewares/index');
// CLOUDINARY
const multer = require('multer');
const storage = require('../cloudinary/index');
const upload = multer({ storage });
// MAPBOX
const geocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = geocoding({ accessToken: process.env.MAPBOX_TOKEN });
// CONTACT FORM
const { sendEmail } = require('../middlewares/email');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get('/', (req, res) => {
	res.render('landing', { page: 'Home - StaySense' });
});
router.get('/contact', (req, res) => {
	res.render('contact', { page: 'Contact' });
});
router.post('/contact', async (req, res) => {
	try {
		await sendEmail(req.body.contact);
		res.redirect('/contact');
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
router.get('/hotels/new', isLoggedIn, (req, res) => {
	res.render('hotels/new', { page: 'New Hotel - StaySense' });
});
router.post('/hotels', isLoggedIn, upload.array('image'), async (req, res) => {
	try {
		const newHotel = new Hotel(req.body.hotel);
		newHotel.author = req.user._id;
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
router.get('/hotels/:id/edit', isLoggedIn, checkHotelAuthor, async (req, res) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		res.render('hotels/edit', { hotel, page: 'Edit Hotel - StaySense' });
	} catch (error) {
		res.send(error);
	}
});
router.patch('/hotels/:id', isLoggedIn, checkHotelAuthor, async (req, res) => {
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
router.delete('/hotels/:id', isLoggedIn, checkHotelAuthor, async (req, res) => {
	try {
		await Hotel.findByIdAndRemove(req.params.id);
		res.redirect('/hotels');
	} catch (error) {
		res.send(error);
	}
});
router.get('/hotels/:id/checkout', isLoggedIn, async (req, res) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		const session = await stripe.checkout.sessions.create({
			payment_method_types: [ 'card' ],
			line_items: [
				{
					price_data: {
						currency: 'inr',
						product_data: {
							name: hotel.name,
							description: hotel.address,
							images: [ hotel.image[0] ]
						},
						unit_amount: hotel.price * 100
					},
					quantity: 1
				}
			],
			mode: 'payment',
			success_url: 'http://localhost:3000/success',
			cancel_url: 'http://localhost:3000/cancel'
		});
		res.redirect(session.url);
	} catch (error) {
		res.send(error);
	}
});
router.get('/success', (req, res) => {
	res.send('payment successful');
});
router.get('/cancel', (req, res) => {
	res.send('payment cancelled');
});
module.exports = router;
