const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(3000, function() {
	console.log('server running on port 3000');
});
