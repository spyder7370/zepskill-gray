// ! requiring packages
const express = require('express'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),
	moment = require('moment'),
	path = require('path'),
	session = require('express-session'),
	flash = require('connect-flash');

// ! initializing packages
const app = express();
require('dotenv').config();

// ! database connection
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('db started');
	})
	.catch((error) => {
		console.log(error);
	});

// ! session setup
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

// ! google auth setup
const { passportInit } = require('./config/passport');
passportInit(app);

// ! server configuration
app.use(flash());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ! global middleware
app.use((req, res, next) => {
	res.locals.moment = moment;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	res.locals.currentUser = req.user;
	next();
});

// ! requiring routes
const hotelRoutes = require('./routes/hotels'),
	reviewRoutes = require('./routes/reviews'),
	authRoutes = require('./routes/auth'),
	oAuthRoutes = require('./routes/oAuth');
app.use(hotelRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(oAuthRoutes);

// ! listening to port
const port = process.env.PORT;
app.listen(port, () => {
	console.log('server started');
});
