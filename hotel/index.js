const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const moment = require('moment');
const path = require('path');
const app = express();
const session = require('express-session');
require('dotenv').config();
const flash = require('connect-flash');
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('db started');
	})
	.catch((error) => {
		console.log(error);
	});

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 2
			// secure: true
		}
	})
);

const { passportInit } = require('./config/passport');
passportInit(app);

app.use(flash());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
	res.locals.moment = moment;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

const hotelRoutes = require('./routes/hotels');
const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');
const oAuthRoutes = require('./routes/oAuth');
app.use(hotelRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(oAuthRoutes);

const port = process.env.PORT;
app.listen(port, () => {
	console.log('server started');
});
