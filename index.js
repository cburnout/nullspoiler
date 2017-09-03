var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer(function (req, res) {
    fs.readFile('createlog.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
    var queryData = url.parse(req.url, true).query;
    console.log(queryData);
}).listen(8080);
