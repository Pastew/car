var socket = io();

function emit(message) {
    socket.emit('action', message);
    return false;
}

$('#led').mousedown(function () {
    emit('ledOn');
});

$('#led').mouseup(function () {
    emit('ledOff');
});

$('#stream').click(function () {
    emit('stream');
});

$('#both-speed-plus').click(function () {
    emit('both_speed_plus');
});

$('#both-speed-minus').click(function () {
    emit('both_speed_minus');
});

$('#left-speed-minus').click(function () {
    emit('left_speed_minus');
});

$('#left-speed-plus').click(function () {
    emit('left_speed_plus');
});

$('#right-speed-minus').click(function () {
    emit('right_speed_minus');
});

$('#right-speed-plus').click(function () {
    emit('right_speed_plus');
});

$(document).ready(function () {
    $(this).keydown(function (e) {
        e.preventDefault();
        switch (e.keyCode) {
        case 87:
            emit('forward');
            break;
        case 83:
            emit('backward');
            break;
        case 65:
            emit('left');
            break;
        case 68:
            emit('right');
            break;
        case 73:
            emit('tiltUp');
            break;
        case 75:
            emit('tiltDown');
            break;
        case 74:
            emit('panLeft');
            break;
        case 76:
            emit('panRight');
            break;
        case 82:
            emit('resetCamera');
            break;

        }
    });

    $(this).keyup(function (e) {
        e.preventDefault();
        var key = e.keyCode;
        if(key == 87 ||
           key == 83 ||
           key == 65 ||
           key == 68)
            emit('stop');
    });
});