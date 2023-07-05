const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/auth/google', async (req, res, next) => {
	passport.authenticate('google', {
		scope: [ 'email', 'profile' ]
	})(req, res, next);
});
router.get(
	'/auth/google/process',
	passport.authenticate('google', {
		failureFlash: true,
		failureRedirect: '/auth/google'
	}),
	(req, res) => {
		// if(!req.user.phone){
		//     return res.render('form')
		// }
		req.flash('success', 'welcome google user');
		res.redirect('/hotels');
	}
);

module.exports = router;
