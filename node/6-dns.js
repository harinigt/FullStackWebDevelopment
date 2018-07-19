'use strict';

var http = require('http'); // do not change this line
var dns = require('dns'); // do not change this line

var server = http.createServer(function(req,res){

	var add= req.url.slice(1);
	console.log(add);
	dns.resolve(add, function (err, addresses,family) {
    if (err) {
    	res.writeHead(200 , {
    		'Content-type' : 'text/plain'
    	});
    	res.write('error');
    	res.end();
     } else{
     	res.writeHead(200 , {
    		'Content-type' : 'text/plain'
    	});
     	//var out = JSON.stringify(addresses)
     	res.write(addresses.toString().replace(/,/g,'\n'));
     	res.end();
     }


  // addresses.forEach(function (a) {
  //   dns.reverse(a, function (err, hostnames) {
  //     if (err) {
  //       throw err;
  //     }

  //     console.log('reverse for ' + a + ': ' + JSON.stringify(hostnames));
  //   });
  // });
});

});

server.listen(process.env.PORT || 8080);


//reference : 
//https://www.tutorialspoint.com/nodejs/nodejs_dns_module.htm
//https://github.com/tj/mad-pages/blob/master/node.dns.md
//https://stackoverflow.com/questions/10610402/javascript-replace-all-commas-in-a-string

// http://localhost:8080/pdx.edu should return '131.252.115.150' in plain text (address might be different, there could even be multiple addresses)

// http://localhost:8080/sniklaus.com should return '216.239.36.21\n216.239.38.21\n216.239.32.21\n216.239.34.21' in plain text (addresses / order might be different)

// http://localhost:8080/error should return 'error' in plain text