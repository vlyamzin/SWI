#!/usr/bin/env node
'use strict';

//module dependencies
var http = require('http'),
    Static = require('node-static'),
    serverModule = require('./server'),
    fileServerPort = normalizePort(process.env.PORT || 8080),
    fileServer = new Static.Server(__dirname + '/www', {});

http.createServer((req, res) => {
    req.addListener('end', function () {
        fileServer.serve(req, res);
    }).resume();
}).listen(fileServerPort);

// app.set('port', port);
// httpServer = http.createServer(app);
// httpServer.listen(httpPort);
// httpServer.on('error', onError);
// httpServer.on('listening', onListening);
serverModule.Server.bootstrap(fileServerPort + 1);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}