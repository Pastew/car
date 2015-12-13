var status = "==========";
var streaming = false;

// ========== constans ==========
var HIGH = 1;
var LOW = 0;
MIN_SPEED = 0;
MAX_SPEED = 250
SPEED_SPAN = 10;

leftSpeed = 255;
rightSpeed = 255;

PAN_GAP = 10
PAN_MAX = 120;
PAN_MIN = 60;

TILT_GAP = 10;
TILT_MAX = 120;
TILT_MIN = 60;

panAngle = 90;
tiltAngle = 90;

// ========== pins ==========
ledNumber = 8;
// left, right wheel
L1 = 10;
L2 = 9;
R1 = 6;
R2 = 5;

// servo pan, servo tilt
PAN = 3;
TILT = 11;

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
        else if (action === "both_speed_plus") both_speed_plus();
        else if (action === "both_speed_minus") both_speed_minus();
        else if (action === "left_speed_minus") left_speed_minus();
        else if (action === "left_speed_plus") left_speed_plus();
        else if (action === "right_speed_minus") right_speed_minus();
        else if (action === "right_speed_plus") right_speed_plus();
        else if (action === "panLeft") panLeft();
        else if (action === "panRight") panRight();
        else if (action === "tiltUp") tiltUp();
        else if (action === "tiltDown") tiltDown();
        else if (action === "stream") streamingOn();
        else if (action === "resetCamera") resetCameraPosition();
        else console.log("Unexpected request action: " + action);
    },

    initCar: function () {
        console.log("Initializing car...");
        resetCameraPosition();
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
    if (leftSpeed + SPEED_SPAN > MAX_SPEED || rightSpeed + SPEED_SPAN > MAX_SPEED)
        return -1;

    left_speed_plus();
    right_speed_plus();
}

function both_speed_minus() {
    if (leftSpeed - SPEED_SPAN < MIN_SPEED || rightSpeed - SPEED_SPAN < MIN_SPEED)
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

function formatSpeed(s) {
    return String(round((s - MIN_SPEED) / (MAX_SPEED - MIN_SPEED) * 100));
}

// ========== camera  ==========
function resetCameraPosition() {
    board.servoWrite(PAN, 90);
    board.servoWrite(TILT, 90);
}

function panRight() {
    if (panAngle - PAN_GAP < PAN_MIN) return;
    panAngle -= PAN_GAP;
    board.servoWrite(PAN, panAngle);
}

function panLeft() {
    if (panAngle + PAN_GAP > PAN_MAX) return;
    panAngle += PAN_GAP;
    board.servoWrite(PAN, panAngle);
}

function tiltDown() {
    if (tiltAngle - TILT_GAP < TILT_MIN) return;
    tiltAngle -= TILT_GAP;
    board.servoWrite(TILT, tiltAngle);
}

function tiltUp() {
    if (tiltAngle + TILT_GAP > TILT_MAX) return;
    tiltAngle += TILT_GAP;
    board.servoWrite(TILT, tiltAngle);
}

function turnOnLed() {
    board.digitalWrite(ledNumber, HIGH);
}

function turnOffLed() {
    board.digitalWrite(ledNumber, LOW);
}

// ========== streaming ==========
function streamingOn() {
    if(!streaming){
        console.log("Turning on video stream...");
        exec("/home/root/websockets/stream.sh", function (err, result) {});
        streaming = true;
    }
}