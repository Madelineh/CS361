var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', 26450); //26450 process.argv[2]
app.set('mysql', mysql);
app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});



// /*
//     THIS CODE IS HEAVILY BORROWED FROM https://github.com/wolfordj/CS290-Server-Side-Examples
//     Code implemented is also borrowed from w3schools.com and stackOverflow.
// */

// var express = require('express');
// var mysql = require('./dbcon.js');
// var bodyParser = require('body-parser');

// var app = express();
// var handlebars = require('express-handlebars').create({
//         defaultLayout:'main',
//         });


// app.engine('handlebars', handlebars.engine);
// app.use(bodyParser.urlencoded({extended:true}));
// app.use('/static', express.static('public'));
// app.set('view engine', 'handlebars');
// app.set('port', 26555); //26450 process.argv[2]
// app.set('mysql', mysql);
// app.use('/customers', require('./customers.js'));//customers.js
// app.use('/search', require('./scraper.js'));
// app.use('/', express.static('public'));


// app.use(function(req,res){
//   res.status(404);
//   res.render('404');
// });

// app.use(function(err, req, res, next){
//   console.error(err.stack);
//   res.status(500);
//   res.render('500');
// });

// app.listen(app.get('port'), function(){
//   console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
// });

