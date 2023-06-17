const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();
const app = express();

mongoose
	.connect(process.env.DB_URI)
	.then(() => {
		console.log('db connected');
	})
	.catch((error) => {
		console.log(error);
	});

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
app.use(jobRoutes);
app.use(notifRoutes);

app.listen(3000, () => {
	console.log('server running on port 3000');
});
