'use strict';
console.info('server.js');

var path = require('path');
var express = require('express');
var app = express();
var port = 4567;




function sendFile(request, response, filePath) {
    var options = {
        root: path.join(__dirname, '/../'),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    response.sendFile(filePath, options, function(err) {
        if (err) {
            console.error(err);
            response.status(err.status).end();
        } else {
            console.info('sent');
        }
    });
}

app.get('/', function(request, response) {
    console.info('GET /');

    var message = { 'message': 'Hello World!' };
    response.send(message);
});

app.get('/menu', function(request, response) {
    console.info('GET /menu/');
    //response.contentType('application/json', '');
    // HACK: avoid express sending charset
    //response.send(new Buffer('howdy'));
    sendFile(request, response, 'stubs/GET-menu.stub.json');
});

app.get('/order/123', function(request, response) {
    console.info('GET /order/123');
    sendFile(request, response, 'stubs/GET-order.stub.json');
});

app.post('/order/long-black', function(request, response) {
    console.info('POST /order/long-black');
    response.status(201);
    sendFile(request, response, 'stubs/POST-order.stub.json');
});


app.listen(port, function() {
    console.log('listening on ' + port);
});
