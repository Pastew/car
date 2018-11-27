import lib.car as car
import lib.turret as turret
import sys, termios, tty, os, time

# You can run this script on rpi (using ssh connection or vnc)
# and control the cat using command line - on server (rpi) side

def getch():
    fd = sys.stdin.fileno()
    old_settings = termios.tcgetattr(fd)
    try:
        tty.setraw(sys.stdin.fileno())
        ch = sys.stdin.read(1)

    finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)
    return ch


button_delay = 0.2

# car.forward(1)\
turret.reset()
while True:
    char = getch()

    if char == "p":
        exit(0)
    if char == "a":
        turret.panLeft()
    elif char == "d":
        turret.panRight()
    elif char == "w":
        turret.tiltUp()
    elif char == "s":
        turret.tiltDown()
    elif char == "r":
        turret.reset()

    elif char == "i":
        car.forward()
    elif char == "k":
        car.backward()
    elif char == "j":
        car.left()
    elif char == "l":
        car.right()

    elif char == "m":
        car.stop()
