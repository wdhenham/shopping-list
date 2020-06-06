
var express = require('express');
var listController = require('./controllers/listController')
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

//set template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
listController(app, bodyParser);

//listen to port
app.listen(8080);
console.log('You are listening to port 8080');
