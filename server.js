
const port=8081
var http = require('http');
var express = require('express');
var expressValidator = require('express-validator');
var morgan = require('morgan');


var bodyParser = require('body-parser')
var get_counter = 0

// create the express webservice app
var app = express();
// log the current folder name
console.log(__dirname)

app.use(bodyParser.json());
// for checking that our post value is an integer
app.use(expressValidator());
// use morgan to log server calls to command line
console.log('app environment '+app.get('env'));
if (app.get('env') == 'production') {
    // when deploying in production we need to set the environmental variable
    // NODE_ENV=production (can set system-wide in profile file or by prepending the definition to the 'node server.js'
    // command
    app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
} else {
    app.use(morgan('dev'));
}


// necessary to allow access from web-client to this node server
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// display the index page.
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html')
    res.send('<h2> Node Server Up </h2>')
});

// the routes are being dumped here for the meantime (they should be in their own file routes.js)
app.get('/calls', function(req, res) {
    // it is necessary to be a little more fancy in our return here as we want angular to receive json
    res.setHeader('Content-Type', 'application/json');
    get_counter+=1
    res.send(JSON.stringify({response : get_counter}));
});

app.post('/calls', function(req, res) {
    req.assert('value', 'An integer >= 0 is required').isInt()
    console.log("Post body.value is "+ req.body.value)
    if (req.body.value < 0) {
        console.log("invalid integer (less than zero)")
        res.status(400).send('Invalid integer')
    }
    res.status(200)
});

app.listen(port, '127.0.0.1');
console.log('server running at http://localhost:' + port)
