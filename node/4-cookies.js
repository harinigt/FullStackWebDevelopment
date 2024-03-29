'use strict';

var http = require('http'); // do not change this line
var server = http.createServer(function(req,res){

   
   var cur_cookies = req.headers.cookie;
   //console.log(cur_cookies);
   if(cur_cookies===undefined){
   	res.writeHead(200, { 
    'Content-Type':'text/plain',
	  'Set-Cookie':'indent='+req.url
	});
	res.write('you must be new');
	res.end();
   } 
   else{
   	 var split1 = cur_cookies.split(';');
   	 console.log(split1)
   	 if(split1.length>1){
           var nth_cookie = split1[split1.length-1]
           var out = nth_cookie.split("=");
   	 }
   	 else 
   	 {
          var out = cur_cookies.split('=');

   	 }
      console.log("nth_cookie :" + nth_cookie);
      console.log("out :" + out);
   	res.writeHead(200, { 
    'Content-Type':'text/plain',
	'Set-Cookie':'indent='+req.url
	});
	res.write('last time you visited "'+out[1]+'"' );
	res.end();
     
   }
});

server.listen(process.env.PORT || 8080);

// http://localhost:8080/hello should return 'you must be new' in plain text and set an ident cookie

// http://localhost:8080/test should return 'last time you visited "/hello"' in plain text

// http://localhost:8080/world should return 'last time you visited "/test"' in plain text

// [now sending requests from a different browser]

// http://localhost:8080/lorem should return 'you must be new' in plain text and set an ident cookie

// http://localhost:8080/moshimoshi should return 'last time you visited "/lorem"' in plain text

// http://localhost:8080/ipsum should return 'last time you visited "/moshimoshi"' in plain text

// [sending requests from the original browser again]

// http://localhost:8080/again should return 'last time you visited "/world"' in plain text

// [the server restarts and looses all cookies]

// http://localhost:8080/servus should return 'you must be new' in plain text and set an ident cookie