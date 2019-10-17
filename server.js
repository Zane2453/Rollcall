var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    config = require('./config'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    models = require('./model').models,
    rollcallPagePath = __dirname + "/web/html/rollcall.ejs",
    rollcallPage = fs.readFileSync(rollcallPagePath, 'utf8');

// create tables
models.studentId.sync({force: false}).then(function(){});

// initialize app
app.use(express.static('./web'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

let addID = function(req, res){
    if(req.body.no.length!=0){
        models.studentId.create(req.body)
            .then(function(){
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end("success!");
            });
    }else{
        res.writeHead(400, {"Content-Type": "text/html"});
        res.end("bad request!");
    }
};

app.get('/', function(req, res){
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(rollcallPage);
});
app.post('/addID', addID);

server.listen((process.env.PORT || config.port), '0.0.0.0');