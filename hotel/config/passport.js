const passport = require('passport');
const googleStrategy = require('passport-google-oauth2');
const User = require('../models/user');
const oAuth = require('./oAuth');
module.exports.passportInit = (app) => {
	app.use(passport.initialize());
	app.use(passport.session());
	passport.use(User.createStrategy());
	passport.use(
		new googleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: 'http://localhost:3000/auth/google/process',
				passReqToCallback: true
			},
			oAuth.authUser
		)
	);
	passport.serializeUser((user, done) => {
		done(null, user);
	});
	passport.deserializeUser((user, done) => {
		done(null, user);
	});
};
