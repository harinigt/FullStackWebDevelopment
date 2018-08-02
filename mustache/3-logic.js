var express = require('express');
var mustache = require('mustache');
var fs = require('fs');

var server = express();

server.get('/3-logic.html', function(req, res) {
	fs.readFile('./3-logic.html', function(err, data) {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});

		res.write(mustache.render(data.toString(), {
					'objectStocks': [
						{ 'strName': 'AMD.NAS', 'dblValue': 6.735, 'dblChange': -0.17, 'dblValue': 1469635304434, 'intVolume': 19873260 },
						{ 'strName': 'FME.FRA', 'dblValue': 81.41, 'dblChange': 0.25, 'intTime': 1469635495373, 'intVolume': 506131 },
						{ 'strName': 'MSFT.NAS', 'dblValue': 56.34, 'dblChange': -0.43, 'intTime': 1469635411375, 'intVolume': 10467243 }
					]
				}));

		res.end();
	});
});

server.listen(8080);

console.log('go ahead and open "http://localhost:8080/3-logic.html" in your browser');