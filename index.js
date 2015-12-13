var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Galileo = require("galileo-io");
exec = require("child_process").exec;
var car = require('./car.js');
$ = require('jquery');
board = new Galileo();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log("Somebody connected");
    car.initCar();
    socket.on('action', function (action) {
        car.handleAction(action);
    });
});

http.listen(3000, function () {
    console.log('listening on port :3000');
    console.log('Drive!');
});

board.on("ready", function () {
    console.log("Board is ready");
    console.log("Setting up pins...");
    this.pinMode(ledNumber, this.MODES.OUTPUT);

    this.pinMode(L1, this.MODES.OUTPUT);
    this.pinMode(L2, this.MODES.OUTPUT);
    this.pinMode(R1, this.MODES.OUTPUT);
    this.pinMode(R2, this.MODES.OUTPUT);
    this.pinMode(PAN, this.MODES.OUTPUT);
    this.pinMode(TILT, this.MODES.OUTPUT);
    console.log("Output Pins setup completed");
});