// small webserver just prints out the request

var http = require('http');

http.createServer(function (req, res) {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        console.log(JSON.parse(body));
        console.log(``)
        // at this point, `body` has the entire request body stored in it as a string
    });
    res.end();
}).listen(8080);