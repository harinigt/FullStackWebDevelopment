'use strict';

var express = require('express'); // do not change this line
var passport = require('passport'); // do not change this line
//var strategy = require('passport-http'); // do not change this line
//var server = express();
//References : http://www.passportjs.org/packages/
//https://github.com/jaredhanson/passport-http
//https://blog.risingstack.com/node-hero-node-js-authentication-passport-js/
var Strategy = require('passport-http').BasicStrategy;
var app = express();

var User = {
	username: "test" ,
	password: "logmein"
}

passport.use(new Strategy(
  function(username, password, done) {
  	if(User.username != username ){
  		return done(null,false); 	
     }
    if( User.password != password){
    	return done(null,false); 
    }
     return done(null,User);	
  }));



app.get('/hello', function(req, res) { 
	res.set({
  	'Content-Type': 'text/plain'
   });   
   res.send("accessible to everyone")
   res.end();

});

app.get('/:parameter', 
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.set({
  	'Content-Type': 'text/plain'
   });   
   res.send("only accessible when logged in")
   res.end();
  });

app.listen(process.env.PORT || 8080);

// preface: use the passport middleware and only grant the user "test" with the password "logmein" access

// note: should the server restart, the browser will still technically be logged in since we are using the http basic access authentication which lets the browser submit the username and the password at each request

// http://localhost:8080/hello should return 'accessible to everyone' in plain text

// http://localhost:8080/world should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password

// http://localhost:8080/test should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password