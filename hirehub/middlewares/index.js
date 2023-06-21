const checkLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) next();
	else res.redirect('/login');
};

const checkAdmin = (req, res, next) => {
	if (req.user.isAdmin) next();
	else return res.send('not permitted');
};

const verifyUser = (req, res, next) => {
	if (req.user.isAdmin || req.user._id.equals(req.params.id)) next();
	else return res.send('not permitted');
};

module.exports = {
	checkAdmin,
	checkLoggedIn,
	verifyUser
};
