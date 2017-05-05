const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const router = require('./routes');
const models = require('./models');


var app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

nunjucks.configure('views', {noCache: true});
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

models.dbConnection.sync({})
.then(function(){
  app.listen(3000, function(){
    console.log('listening on port 3000......')
  });
})
.catch(console.error);
