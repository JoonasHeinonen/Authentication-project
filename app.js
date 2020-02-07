// Require needed packages for our application
const http         = require('http');
const express      = require('express');
const bodyParser   = require('body-parser');
const bcrypt       = require('bcrypt');
const mongoose     = require('mongoose');
const session      = require('express-session');
const connectMongo = require('connect-mongo')(session);

// Define the hostname and portnumber
const hostname     = '127.0.0.1'
const port         = 3000;

// Create our server
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

// Where we will start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});