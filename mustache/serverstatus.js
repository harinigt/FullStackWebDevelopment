var http = require('http');
var dgram = require('dgram');
var fs = require('fs');
var mustache = require('mustache');

var objectServer = http.createServer(function(objectRequest, objectResponse) {
	var strTemplate = '';

	var functionTemplate = function() {
		fs.readFile('serverstatus.html', function(objectError, objectData) {
			if (objectError !== null) {
				return functionError();
			}

			strTemplate = objectData.toString();

			return functionQuery();
		});
	};

	var objectConfigs = [];
	var objectPlayers = [];

	var functionQuery = function() {
		var objectClient = dgram.createSocket('udp4');

		objectClient.on('message', function(objectMessage) {
			var strMessage = objectMessage.toString('ascii');

			{
				var objectRegex = new RegExp('(\\\\)([^\\\\\\n]+)(\\\\)([^\\\\\\n]+)', 'g');

				do {
					var objectMatch = objectRegex.exec(strMessage);

					if (objectMatch === null) {
						break;
					}

					objectConfigs.push({
						'strName': objectMatch[2],
						'strValue': objectMatch[4]
					});
				} while (true);
			}

			{
				var objectRegex = new RegExp('([0-9]+)( )([0-9]+)( )(")([^"]+)(")', 'g');

				do {
					var objectMatch = objectRegex.exec(strMessage);

					if (objectMatch === null) {
						break;
					}

					objectPlayers.push({
						'strName': objectMatch[6],
						'intScore': parseInt(objectMatch[1], 10),
						'intPing': parseInt(objectMatch[3], 10)
					});
				} while (true);
			}

			objectClient.close();

			return functionSuccess();
		});

		objectClient.send([ Buffer.from([0xFF, 0xFF, 0xFF, 0xFF]), Buffer.from('getstatus') ], 28960, '64.94.238.161', function(objectError) {
			if (objectError !== null) {
				objectClient.close();

				return functionError();
			}
		});
	};

	var functionError = function() {
		objectResponse.end();
	};

	var functionSuccess = function() {
		objectResponse.writeHead(200, {
			'Content-Type': 'text/html'
		});

		objectResponse.write(mustache.render(strTemplate, {
			'objectConfigs': objectConfigs,
			'objectPlayers': objectPlayers,
			'functionColorize': function() {
				return function(strValue, render) {
					strValue = '<span>' + render(strValue) + '</span>';

					strValue = strValue.split('^1').join('</span><span style="color:red;">');
					strValue = strValue.split('^2').join('</span><span style="color:green;">');
					strValue = strValue.split('^3').join('</span><span style="color:yellow;">');
					strValue = strValue.split('^4').join('</span><span style="color:blue;">');
					strValue = strValue.split('^5').join('</span><span style="color:cyan;">');
					strValue = strValue.split('^6').join('</span><span style="color:purple;">');
					strValue = strValue.split('^7').join('</span><span style="color:white;">');
					strValue = strValue.split('^8').join('</span><span style="color:black;">');
					strValue = strValue.split('^9').join('</span><span style="color:gray;">');
					strValue = strValue.split('^0').join('</span><span style="color:black;">');

					return strValue;
				};
			}
		}));

		objectResponse.end();
	};

	return functionTemplate();
});

objectServer.listen(8080);