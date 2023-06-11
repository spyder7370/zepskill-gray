const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

mongoose
	.connect('mongodb+srv://admin:admin@cluster0.nlqnd6p.mongodb.net/?retryWrites=true&w=majority')
	.then(function() {
		console.log('db connected');
	})
	.catch(function(err) {
		console.log(err);
	});

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

const productRouter = require('./routes/product');
app.use(productRouter);

app.listen(3000, function() {
	console.log('server running on port 3000');
});
