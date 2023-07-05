const User = require('../models/user');
module.exports.authUser = async (req, accessToken, refreshToken, profile, done) => {
	try {
		if (!req.user) {
			// either have to login/register
			const user = await User.findOne({ googleId: profile.id });
			if (user) {
				// login
				done(null, user);
			}
			// register
			const newUser = new User({
				googleId: profile.id,
				googleToken: accessToken,
				username: profile.email,
				name: profile.given_name + ' ' + profile.family_name
			});
			await newUser.save();
			done(null, newUser);
		} else {
			// already logged in
			console.log('already logged in');
			done(null, false, req.flash('error', 'already logged in'));
		}
	} catch (error) {
		return done(err, null);
	}
};
