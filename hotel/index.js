const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const moment = require('moment');
const path = require('path');
const app = express();
const session = require('express-session');
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local');

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

const User = require('./models/user');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
const authRoutes = require('./routes/auth');
app.use(hotelRoutes);
app.use(reviewRoutes);
app.use(authRoutes);

const port = process.env.PORT;
app.listen(port, () => {
	console.log('server started');
});
