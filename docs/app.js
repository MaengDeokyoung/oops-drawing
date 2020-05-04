'use strict';

// simple express server

var express = require('express');
var app = express();
var router = express.Router();

var path = {
    dist: 'docs/',
    html: 'html/'
};

app.use(express.static(path.dist));
app.get('/', function (req, res) {
    res.sendfile(path.dist + 'index.html');
});

app.get('/wave', function (req, res) {
    res.sendfile(path.dist + path.html + 'wave.html');
});

app.listen(5000);