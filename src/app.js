'use strict';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();

var path = {
    dist: 'dist/',
    html: 'public/html/'
}

app.use(express.static(path.dist + 'public'));
app.get('/', function(req, res) {
    res.sendfile(path.dist + 'index.html');
});

app.get('/wave', function(req, res) {
    res.sendfile(path.dist + path.html + 'wave.html');
});

app.listen(5000);