var express = require('express');
var body_parser = require('body-parser')

var app = express();
app.use(express.static(__dirname + '/'))

app.use(body_parser.json());
//app.use(express.json());

app.post('/createlog', function(req, res) {
    'use strict';
    var body = req.body;
    console.log(body);
    res.sendStatus(200);
});
app.listen(3000);
