'use strict';

var http = require('http'); // do not change this line
var querystring = require('querystring'); // do not change this line

//var objectComments = [];
var body_data = '';
var server = http.createServer(function(req, res) {

if(req.url === '/form'){
	  res.writeHead(200, {
			'Content-Type': 'text/html'
		});

        var out = '<!DOCTYPE html><html><body>';
        out+='<form action="/new" method="post">';
        out+='<input type="text" name="name">';
        out+='<input type="text" name="message">';
        out+='<input type="submit" value="submit">';
        out+='</form></body></html>';

		res.write(out);

		res.end();

		//reference used : https://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
		//https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190
} else if (req.url === '/new'){
                
            req.on('data', function (datazz) {
            body_data += datazz.toString()+']';

            // Too much POST data, kill the connection!
            // if (body.length > 1e6)
            //     request.connection.destroy();
        });

        req.on('end', function () {
            var post = querystring.parse(body_data);
            res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
            //console.log(body_data);
            res.write('thank you for your message');
            res.end();
        });
    



} else if(req.url === '/list'){
	res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
    var out = '';
    //body_data= body_data.trim();
	var split0 = body_data.split(']');
    

    console.log(split0);
	for(var i = 0 ; i < split0.length-1 ; i++ ){

		var split1 = querystring.parse(split0[i])
		out += split1.name+": "+split1.message + "\n";


	}
    out = out.replace(/\n$/, "")
    res.write(out);
	// if(split.length==0){
		
		
	// 	console.log('ooooooiiio'+body_data);
	// }else{
	// 	var post = querystring.parse(body_data);
	// 	//console.log(querystring.stringify(post));
	// 	console.log('ooooooo'+body_data);
	// }
	res.end();

}

});

server.listen(process.env.PORT || 8080);

// http://localhost:8080/form should return the form as shown below
//   res.writeHead(200, {
//   	'Content-Type': 'text/html'
//   });
//   
//   res.write('<!DOCTYPE html>');
//   res.write('<html>');
//   	res.write('<body>');
//   		res.write('<form action="/new" method="post">');
//   			res.write('<input type="text" name="name">');
//   			res.write('<input type="text" name="message">');
//   			res.write('<input type="submit" value="submit">');
//   		res.write('</form>');
//   	res.write('</body>');
//   res.write('</html>');
//   
//   res.end();

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message' in plain text

// http://localhost:8080/form should return the form as shown above

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message\nanother name: another message' in plain text

// [the server restarts and looses all messages]

// http://localhost:8080/list should return '' in plain text