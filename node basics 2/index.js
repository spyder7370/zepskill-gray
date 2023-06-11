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

app.use(express.static(__dirname + '/public'));
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded()); // to parse incoming form data
app.set('view engine', 'ejs'); // optional -> to omit extension .ejs from files

const productModel = require('./models/product.js');

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

// INSERT
app.get('/addtodb', async function(req, res) {
	// productModel.save(data, function(err, savedData){
	// 	res.send(savedData);
	// }))
	// productModel.save(data)
	// .then((savedData) => {
	// 	res.send(savedData);
	// });
	const newProduct = new productModel({
		name: 'phone 2',
		price: 5000,
		sellerName: 'nokia',
		sellerAddress: 'delhi',
		sellerPhone: 145987412,
		inStock: false
	});
	await newProduct.save();
	res.send(newProduct);
});

// fetch
app.get('/getallproducts', async function(req, res) {
	const products = productModel.find();
	res.send(products);
});

// fetch by id
app.get('/singleproduct/:id', async function(req, res) {
	let id = req.params.id;
	const product = await productModel.findById(id);
	res.send(product);
});

// update documents
app.get('/updateproduct/:id', async function(req, res) {
	let id = req.params.id;
	// await productModel.findByIdAndUpdate(id, {
	// 	price: 8000
	// });
	const product = await productModel.updateMany(
		{ sellerName: 'nokia' },
		{
			price: 10000,
			sellerPhone: 1421516215
		}
	);
	if (!product) console.log('not found');
	res.send('done');
});

// delete
app.get('/deleteproduct/:id', async function(req, res) {
	await productModel.deleteMany({ sellerName: 'nokia' });
	res.send('done');
});

app.listen(3000, function() {
	console.log('server running on port 3000');
});
