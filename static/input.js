var socket = io();

function emit(message) {
    socket.emit('action', message);
    return false;
}

document.body.onkeydown = function (e) {
    e.preventDefault();
    switch (e.keyCode) {
    case 87:
        console.log('forward');
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
};

document.body.onkeyup = function (e) {
    e.preventDefault();
    var key = e.keyCode;
    if(key == 87 ||
       key == 83 ||
       key == 65 ||
       key == 68){
        emit('stop');
        console.log('stop');
       }
};