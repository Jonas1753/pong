let serve = require('node-static');
let package=require('./package.json');


//Create a node-static server instance to serve the './public' folder
let file = new serve.Server('',{"cache":0, gzip: true });

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(package.config.port);