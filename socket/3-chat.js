'use strict';

var express = require('express'); // do not change this line
var socket = require('socket.io'); // do not change this line
var assert = require('assert'); // do not change this line

var server = express();

server.use('/', express.static(__dirname + '/'));

var io = socket(server.listen(process.env.PORT || 8082)); // do not change this line
var clientArray = [];
io.on('connection', function(objectSocket) {
	// send everyone the 'clients' event, contianing an array with the ids of the connected clients - example: { 'strClients':['GxwYr9Uz...','9T1P4pUQ...'] }
	// send everyone the 'message' event, containing a message that a new client connected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ... connected' }

	//references used : https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
	// chat code from the socket slides. 

	//objectSocket.id = Math.random().toString(36).slice(5)+'...';
	clientArray.push(objectSocket.id);

	io.emit('clients' ,{
		'strClients' : clientArray
		
	});

    io.emit('message' , {
    	'strFrom':'server', 
		'strTo':'everyone', 
		'strMessage':objectSocket.id + ' connected' 
    } )

	objectSocket.on('message', function(objectData) {
		// if the message should be recevied by everyone, broadcast it accordingly
		// if the message has a single target, send it to this target as well as to the origin
		if(objectData.strTo === 'everyone'){
			io.emit('message' , {
				'strTo' : 'everyone',
				'strFrom' :objectSocket.id,
				'strMessage':objectData.strMessage
			})
		} 
		else  {
			io.to(objectData.strTo).emit('message' , {
				'strTo' : objectData.strTo,
				'strFrom' :objectSocket.id,
				'strMessage':objectData.strMessage
			})

			io.to(objectSocket.id).emit('message' , {
				'strTo' : objectData.strTo,
				'strFrom' :objectSocket.id,
				'strMessage':objectData.strMessage
			})

		}


	
	});

	objectSocket.on('disconnect', function() {
		var index = clientArray.indexOf(objectSocket.id)
		clientArray.splice( index,1);
	
		io.emit('clients' ,{
		'strClients' : clientArray
		
	    })

	    io.emit('message' , {
    	'strFrom':'server', 
		'strTo':'everyone', 
		'strMessage':objectSocket.id + ' disconnected' 
         })
 

		// send everyone the 'clients' event, contianing an array of the connected clients - example: { 'strClients':['GxwYr9Uz...'] }
		// send everyone the 'message' event, containing a message that an existing client disconnected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ... disconnected' }
	});
});

console.log('go ahead and open "http://localhost:8080/3-chat.html" in your browser');