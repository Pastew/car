var status = "==========";

// ========== constans ==========
var HIGH = 1;
var LOW = 0;
MIN_SPEED = 0;
MAX_SPEED = 250
SPEED_SPAN = 10;
leftSpeed = 255;
rightSpeed = 255;

// ========== pins ==========
ledNumber = 8;
L1 = 10;
L2 = 9;
R1 = 6;
R2 = 5;

UP_DOWN = 11;
OPEN_CLOSE = 3;


// ========== action to function mapping ==========
module.exports = {
    handleAction: function (action) {
        console.log("CAR action: " + action)

        if (action === "ledOn") turnOnLed();
        else if (action === "ledOff") turnOffLed();
        else if (action === "forward") forward();
        else if (action === "backward") backward();
        else if (action === "left") left();
        else if (action === "right") right();
        else if (action === "stop") stop();
        else if (action === "up") up();
        else if (action === "down") down();
        else if (action === "open") open();
        else if (action === "close") close();
        else if (action === "both_speed_plus") both_speed_plus();
        else if (action === "both_speed_minus") both_speed_minus();
        else if (action === "left_speed_minus") left_speed_minus();
        else if (action === "left_speed_plus") left_speed_plus();
        else if (action === "right_speed_minus") right_speed_minus();
        else if (action === "right_speed_plus") right_speed_plus();
        else console.log("Unexpected request action: " + action);
    }
}

// ========== steering ==========
function forward() {
    board.analogWrite(L1, leftSpeed);
    board.analogWrite(R1, rightSpeed);
    board.analogWrite(L2, 0);
    board.analogWrite(R2, 0);
    status = "forward";
}

function backward() {
    board.analogWrite(L1, 0);
    board.analogWrite(R1, 0);
    board.analogWrite(L2, leftSpeed);
    board.analogWrite(R2, rightSpeed);
    status = "back";
}

function right() {
    board.analogWrite(L1, leftSpeed);
    board.analogWrite(R1, 0);
    board.analogWrite(L2, 0);
    board.analogWrite(R2, rightSpeed);
    status = "right";
}

function left() {
    board.analogWrite(L1, 0);
    board.analogWrite(R1, rightSpeed);
    board.analogWrite(L2, leftSpeed);
    board.analogWrite(R2, 0);
    status = "left";
}

function stop() {
    board.analogWrite(L1, 0);
    board.analogWrite(R1, 0);
    board.analogWrite(L2, 0);
    board.analogWrite(R2, 0);
    status = "stop";
}

// ========== motors speed ==========
function both_speed_plus() {
    if(leftSpeed + SPEED_SPAN > MAX_SPEED
    || rightSpeed + SPEED_SPAN > MAX_SPEED)
        return -1;
    
    left_speed_plus();
    right_speed_plus();
}

function both_speed_minus() {
    if(leftSpeed - SPEED_SPAN < MIN_SPEED
    || rightSpeed - SPEED_SPAN < MIN_SPEED)
        return -1;
    
    left_speed_minus();
    right_speed_minus();
}

function left_speed_minus() {
    leftSpeed -= SPEED_SPAN;
    if (leftSpeed < MIN_SPEED)
        leftSpeed = MIN_SPEED;
    
    //$("#left-speed").text(formatSpeed(leftSpeed));
}

function left_speed_plus() {
    leftSpeed += SPEED_SPAN;
    if (leftSpeed > MAX_SPEED)
        leftSpeed = MAX_SPEED;
    
    //$("#left-speed").text(formatSpeed(leftSpeed));
}

function right_speed_minus() {
    rightSpeed -= SPEED_SPAN;
    if (rightSpeed < MIN_SPEED)
        rightSpeed = MIN_SPEED;
    
    //$("#right-speed").text(formatSpeed(rightSpeed));
}

function right_speed_plus() {
    rightSpeed += SPEED_SPAN;
    if (rightSpeed > MAX_SPEED)
        rightSpeed = MAX_SPEED; 
    
    //$("#right-speed").text(formatSpeed(rightSpeed));
}

function formatSpeed(s){
    return String(round((s-MIN_SPEED) / (MAX_SPEED-MIN_SPEED) * 100));
}

// ========== servo ==========
function up() {
    board.servoWrite(UP_DOWN, 100);
}

function down() {
    board.servoWrite(UP_DOWN, 50);
}

function close() {
    board.servoWrite(OPEN_CLOSE, 80);
}

function open() {
    board.servoWrite(OPEN_CLOSE, 0);
}

function turnOnLed() {
    board.digitalWrite(ledNumber, HIGH);
}

function turnOffLed() {
    board.digitalWrite(ledNumber, LOW);
}

// ========== streaming ==========
function streamingOn() {
        console.log("Turning on video stream...");
        exec("/home/root/websockets/stream.sh", function (err, result) {});
}