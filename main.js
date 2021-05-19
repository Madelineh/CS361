var express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
// const puppeteer = require('puppeteer');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
// const puppeteer = require('puppeteer');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 26450);

// app.use(require('./routes/index'));
// app.use(require('./routes/results'));
app.use(express.static('views'));

//Routes

// app.use('/', require('./views/scraper.js'));

app.get('/',function(req,res){
  // app.use(require('./routes/index'));
  // app.use(require('./routes/results'));
  res.render('home.handlebars'); 

  // require('./scraper.js');
  // require('view/scraper.js');
  // res.render('index.html') 
});

// app.get('/search-figure',function(req,res){
//   res.render('search-figure');
// });

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});

// const puppeteer = require('puppeteer');

 