/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load users route
var app = express();
var bodyParser = require('body-parser');
var connection  = require('express-myconnection');
var mysql = require('mysql');
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/*------------------------------------------
 connection peer, register as middleware
 type koneksi : single,pool and request
 -------------------------------------------*/
app.use(
	connection(mysql,{
		host: 'localhost',
		user: 'root',
		password : '',
		port : 3306,
		database:'dices'
	},'single')

);
app.get('/', routes.index);//route index
app.post('/access', routes.access);//route access
app.post('/dashboard', routes.dashboard);//route dashboard
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});