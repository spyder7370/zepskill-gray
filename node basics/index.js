// *1. requiring packages
const express = require('express');
const path = require('path');
const app = express();

// *2. database
// *3. session and auth

// *4. config
app.use(express.static(path.join(__dirname, 'public')));

// *5. api
// http -> request: get, post, put, patch, delete
// app.method(endpoint, callback)
app.get('/', function(req, res) {
	res.send('server is working');
});

app.get('/greet', function(req, res) {
	// console.log(req.query);
	res.send('hello ' + req.query.name);
});

app.get('/greet/:name', function(req, res) {
	// console.log(req.params);
	// let name = req.params.name;
	let { name } = req.params; // ! destructuring
	const paragraph = '<div>this is a <em>para</em></div>';
	res.render('index.ejs', { username: name, age: 7, color: 'red', paragraph });
});

app.get('*', function(req, res) {
	// res.redirect(url);
	res.redirect('/');
});

// *6. to make server listen to requests on a port
// app.listen(port no)
app.listen(3000, function() {
	console.log('server is working on port 3000');
});
