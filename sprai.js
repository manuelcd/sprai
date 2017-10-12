
var address = require('network-address');


var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
let util = require('./src/util');



app.set('view engine', 'pug')
app.use(express.static('static'));


io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

/**
 * Index
 */
app.get('/', function (req, res) {
    res.render('sprai', {title: 'Hey', message: 'Hello there!'})
    //res.send('hello world');
});

app.get('/:path/:id', function (req, res) {
    
    res.send(util(req.params.id, req.params.path));

    
})


app.post('/upload', (rep, res) => {
    
    console.log('llamado');
    res.send('ok')
    
})



server = http.listen(3000, function () {
    console.log('Listening on port %d ' + address(), server.address().port);
});





