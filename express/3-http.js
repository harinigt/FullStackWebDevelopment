'use strict';

var express = require('express'); // do not change this line
var server = express();
var cookieParser = require('cookie-parser');
server.use(cookieParser());

server.get('/missing',function(req,res){
res.status(404);
res.set({
	'Content-Type' : 'text/plain'
});

res.send('your princess is in another castle')

});


server.get('/redirect',function(req,res){
res.status(301).redirect('/redirected');
res.status(200);
res.set({
	'Content-Type' : 'text/plain',

});



});
server.get('/cache',function(req,res){
res.set('Cache-Control', 'max-age=86400');
res.status(200);
res.set({
	'Content-Type' : 'text/plain',

});
res.send('cache this resource');
});



server.get('/cookie',function(req,res){
res.set('Set-Cookie', 'hello=world');
//res.cookie('hello','world');
res.status(200);
res.set({
	'Content-Type' : 'text/plain',
});
//console.log(req.cookies);
res.send('i gave you a cookie');

});


server.get('/check',function(req,res){
var out ='no';
var cookies = req.cookies;
for (var key in cookies){
	if(key==='hello' && cookies[key]==='world'){
		out = 'yes';
	}
}
res.status(200);
res.set({
	'Content-Type' : 'text/plain',

});
res.send(out);

});

server.listen(process.env.PORT || 8080);

// http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text

// http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code

// http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day

// http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie

// http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie