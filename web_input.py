from aiohttp import web
import socketio
import lib.car as car
import lib.turret as turret

sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)


async def index(request):
    """Serve the client-side application."""
    with open('index.html') as f:
        return web.Response(text=f.read(), content_type='text/html')


@sio.on('connect')
def connect(sid, environ):
    print("connect ", sid)


@sio.on('action')
async def message(sid, data):
    print("action: ", data)
    handle_action(data)


@sio.on('disconnect')
def disconnect(sid):
    print('disconnect ', sid)


def handle_action(action):
    if action == "panLeft":
        turret.panLeft()
    elif action == "panRight":
        turret.panRight()
    elif action == "tiltUp":
        turret.tiltUp()
    elif action == "tiltDown":
        turret.tiltDown()
    elif action == "resetCamera":
        turret.reset()

    elif action == "forward":
        car.forward()
    elif action == "backward":
        car.backward()
    elif action == "left":
        car.left()
    elif action == "right":
        car.right()

    elif action == "stop":
        car.stop()

app.router.add_static('/static', '/home/pi/car/static')

app.router.add_get('/', index)

if __name__ == '__main__':
    web.run_app(app)
