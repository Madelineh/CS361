var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
// const puppeteer = require('puppeteer');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 26450);




//Routes

app.use('/', require('./views/scraper.js'));

// app.get('/',function(req,res){
//   res.render('home.handlebars'); 
//   // require('./scraper.js');
//   // require('./scraper.js')
//   // res.render('index.html') 
// });

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

const puppeteer = require('puppeteer');

 