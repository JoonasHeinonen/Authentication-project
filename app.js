// Require needed packages for our application
const express      = require('express');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const session      = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Define our app
const app = express();

// Define the hostname and portnumber
const hostname     = '127.0.0.1'
const port         = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/authentication');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to the database succesfully!");
});

app.use(session({
    secret: 'Carpe diem!',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

// Use body-parser for incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Where static files will be served from
app.use(express.static(__dirname + '/static'));

// This is where we will include our routes
const router = require('./routes/router');
app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler for app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

// Where we will start the server
app.listen(port, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});