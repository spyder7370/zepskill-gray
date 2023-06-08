const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose
	.connect('mongodb+srv://admin:admin@cluster0.nlqnd6p.mongodb.net/?retryWrites=true&w=majority')
	.then(function() {
		console.log('db connected');
	})
	.catch(function(err) {
		console.log(err);
	});

const productModel = require('./models/product.js');

app.use(express.static(__dirname + '/public'));
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded()); // to parse incoming form data
app.set('view engine', 'ejs'); // optional -> to omit extension .ejs from files

// res.send -> raw data
// res.json -> json format
// res.redirect -> redirect to some url
// res.render -> renders a html/ejs page
app.get('/', function(req, res) {
	res.send('working');
	// res.redirect('https://www.google.com');
});

// req.params
// req.query
// req.body
// req.headers
app.get('/user/:name', function(req, res) {
	let variable = req.params.name;
	res.render('index', { variable });
});

app.get('/form', function(req, res) {
	res.render('form');
});

app.get('/formsubmit', function(req, res) {
	res.send(req.query);
});

app.post('/formsubmit', function(req, res) {
	let userEmail = req.body.email;
	if (!check(userEmail)) {
		res.redirect('/form', { error: 'wrong email format', errorCode: 200 });
	}
	let userPassword = req.body.password;
	let userImage = req.body.image;
	res.render('show', { userEmail, userPassword, userImage });
});

app.listen(3000, function() {
	console.log('server running on port 3000');
});
