'use strict';
console.info('server.js');

var express = require('express');
var app = express();
var port = 8080;

app.get('/', function (request, response) {
	console.info('GET /');
	response.send('Hello World!');
});

app.listen(port, function() {
	console.log('listening on ' + port);
});
