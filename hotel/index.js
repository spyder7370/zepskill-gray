const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const moment = require('moment');
const path = require('path');
const app = express();
require('dotenv').config();

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('db started');
	})
	.catch((error) => {
		console.log(error);
	});

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
	res.locals.moment = moment;
	next();
});

const hotelRoutes = require('./routes/hotels');
const reviewRoutes = require('./routes/reviews');
app.use(hotelRoutes);
app.use(reviewRoutes);

const port = process.env.PORT;
app.listen(port, () => {
	console.log('server started');
});
