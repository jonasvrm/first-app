var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

global.__base = __dirname + '/';
global.__manage = __dirname + '/manage/';
global.__manageUrl = 'http://localhost:3000/manage';

//paths to scripts and styles
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__base + 'node_modules/bootstrap/dist/'));
app.use('/jquery', express.static(__base + 'node_modules/jquery/dist/'));
app.use('/fontawesome', express.static(__base + 'node_modules/font-awesome/css/'));

app.use('/manage', require(__base + 'manage/app'));

module.exports = app;
