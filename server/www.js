#!/usr/bin/env node
"use strict";

//module dependencies
var server = require("./server"),
    debug = require("debug")("express:server"),
    http = require("http"),
    httpPort = normalizePort(process.env.PORT || 8080),
    app = server.Server.bootstrap().app,
    httpServer;

app.set("port", httpPort);
httpServer = http.createServer(app);
httpServer.listen(httpPort);
httpServer.on("error", onError);
httpServer.on("listening", onListening);

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

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var address = httpServer.address(),
        bind;

    bind = typeof address === "string" ? "pipe " + address : "port " + address.port;

    debug("Listening on " + bind);
}