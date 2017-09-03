var http = require('http'),
	fs = require('fs'),
	url = require('url');
// NEVER use a Sync function except at start-up!
index = fs.readFileSync(__dirname + '/index.html')
showlog = fs.readFileSync(__dirname + '/show.html')
createlog = fs.readFileSync(__dirname + '/create.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});

	var pathname = url.parse(req.url).pathname;
	switch(pathname){
		case '/index.html':
		case '/':
			res.end(index);
			break;
		case '/show.html':
			res.end(showlog)
			break;
		case '/create.html':
			res.end(createlog)
			break;
	}
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Emit welcome message on connection
io.on('connection', function(socket) {
	// Use socket to communicate with this particular client only, sending it it's own id
	socket.emit('welcome', { message: 'Welcome!', id: socket.id });

	socket.on('i am client', console.log);
	socket.on('rec-final', console.log);
	socket.on('submit spoiler', function(data) {
		console.log(data);
		fs.writeFile("spoilerlogs/test.log", data, (err) => {
			if (err) throw err;
			console.log('saved');
		});	
	});
	socket.on('show log', function(data) {
		var to_send = fs.readFile(__dirname + '/spoilerlogs/test.log');
		socket.emit('return log', to_send);
	});
});


app.listen(3000);
