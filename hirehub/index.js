const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
require('dotenv').config();
const app = express();

// ! DB setup
mongoose
	.connect(process.env.DB_URI)
	.then(() => {
		console.log('db connected');
	})
	.catch((error) => {
		console.log(error);
	});
const User = require('./models/user');

// ! Session setup
app.use(
	session({
		secret: '92BCD6ED83CCCEFA5689A1F33D622',
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			// secure: true,
			maxAge: 1000 * 60 * 60 * 24 * 2
		}
	})
);

// ! passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ! server setup
// serving static files
app.use(express.static(path.join(__dirname, 'public')));
// form data parsing
app.use(express.urlencoded({ extended: true }));
// remove ejs extension
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
	res.send('working');
});

const jobRoutes = require('./routes/jobs');
const notifRoutes = require('./routes/notifications');
const authRoutes = require('./routes/auth');
app.use(jobRoutes);
app.use(notifRoutes);
app.use(authRoutes);

app.listen(3000, () => {
	console.log('server running on port 3000');
});
