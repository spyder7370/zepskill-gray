const express = require('express');
const mongoose = require('mongoose');
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
app.use(express.urlencoded({ extended: true }));

const hotelRoutes = require('./routes/hotels');
app.use(hotelRoutes);

const port = process.env.PORT;
app.listen(port, () => {
	console.log('server started');
});
