//var exports = module.exports = {};

var HIGH = 1;
var LOW = 0;

/**** Galileo-io version ****/

var status = "---";

ledNumber = 8;

L1 = 10;
L2 = 9;
R1 = 6;
R2 = 5;

UP_DOWN = 11;
OPEN_CLOSE = 3;

/*
 * About controlling galileo with a webpage
 */
module.exports = {
  handleAction : function(action){
    console.log("CAR action: " + action)

    if(action === "ledOn") turnOnLed();
    else if(action === "ledOff") turnOffLed();
    else if(action === "forward") forward();
    else if(action === "backward") backward();
    else if(action === "left") left();
    else if(action === "right") right();
    else if(action === "stop") stop();
    else if(action === "up") up();
    else if(action === "down") down();
    else if(action === "open") open();
    else if(action === "close") close();
    else if(action === "streamingOn") streamingOn();
    else console.log("Unexpected request action: " + action);
  }
}

function forward(){
  board.digitalWrite(L1, HIGH);
  board.digitalWrite(R1, HIGH);
  board.digitalWrite(L2, LOW);
  board.digitalWrite(R2, LOW);
  status = "forward";
}

function backward(){
  board.digitalWrite(L1, LOW);
  board.digitalWrite(R1, LOW);
  board.digitalWrite(L2, HIGH);
  board.digitalWrite(R2, HIGH);
  status = "back";
}

function right(){
  board.digitalWrite(L1, HIGH);
  board.digitalWrite(R1, LOW);
  board.digitalWrite(L2, LOW);
  board.digitalWrite(R2, HIGH);
  status = "right";
}

function left(){
  board.digitalWrite(L1, LOW);
  board.digitalWrite(R1, HIGH);
  board.digitalWrite(L2, HIGH);
  board.digitalWrite(R2, LOW);
  status = "left";
}

function stop(){
  board.digitalWrite(L1, LOW);
  board.digitalWrite(R1, LOW);
  board.digitalWrite(L2, LOW);
  board.digitalWrite(R2, LOW);
  status = "stop";
}

function up(){
  board.servoWrite(UP_DOWN, 100);
}

function down(){
  board.servoWrite(UP_DOWN, 50);
}

function close(){
  board.servoWrite(OPEN_CLOSE, 80);
}

function open(){
  board.servoWrite(OPEN_CLOSE, 0);
}

function turnOnLed(){
  board.digitalWrite(ledNumber, HIGH);
}

function turnOffLed(){
  board.digitalWrite(ledNumber, LOW);
}

function streamingOn(){
  console.log("Turning on video stream...");
  exec("/home/root/car2/stream.sh", function(err, result) {
  });
}
