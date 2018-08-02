'use strict';

var express = require('express'); // do not change this line
var session = require('express-session'); // do not change this line
var cookieParser = require('cookie-parser');
var server = express();
var i =0;
server.use(cookieParser());
server.use(session({'store': new session.MemoryStore(),
	                'secret': 'a secret to sign the cookie',
	                'resave': false,
	                'saveUninitialized': false,
	                'cookie': { 'maxAge': 86400000 }}));

server.get('/:parameter', function(req, res) {  
	res.status(200);  
	res.set({ 'Content-Type': 'text/plain' });
	console.log(req.session.example)
	if (req.session.example === undefined) 
		{    res.set({
	              'Content-Type' : 'text/plain',
              });
	         res.set('Set-Cookie' , "indent=user"+i);
			 req.session.example = []; 
		     req.session.example.push(req.url);  

		     res.send('you must be new');  } 
	else {    
		res.set({
	              'Content-Type' : 'text/plain',            
              });
        res.set('Set-Cookie' , "indent=user"+i++);
        var out = req.session.example.join('\n  ')
		req.session.example.push(req.url);
		res.send("your history:\n  " + out);  


	}});

server.listen(process.env.PORT || 8080);


//https://www.npmjs.com/package/express-session
// preface: use the express-session middleware with the memory storage which should make this task rather easy

// http://localhost:8080/hello should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware

// http://localhost:8080/test should return 'your history:\n  /hello' in plain text

// http://localhost:8080/world should return 'your history:\n  /hello\n  /test' in plain text

// [now sending requests from a different browser]

// http://localhost:8080/lorem should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware

// http://localhost:8080/moshimoshi should return 'your history:\n  /lorem' in plain text

// http://localhost:8080/ipsum should return 'your history:\n  /lorem\n  /moshimoshi' in plain text

// [sending requests from the original browser again]

// http://localhost:8080/again should return 'your history:\n  /hello\n  /test\n /world' in plain text

// [the server restarts and looses all cookies]

// http://localhost:8080/servus should return 'you must be new' in plain text and implicitly set an ident cookie by using the session middleware