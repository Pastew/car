import RPi.GPIO as GPIO
from time import sleep

PAN = 21
TILT = 20

servos = [PAN, TILT]
pwms = {}

PAN_GAP = 10
PAN_MAX = 120
PAN_MIN = 60

TILT_GAP = 10
TILT_MAX = 120
TILT_MIN = 60

panAngle = 90
tiltAngle = 90

GPIO.setmode(GPIO.BCM)
for servo in servos:
    GPIO.setup(servo, GPIO.OUT)
    pwms[servo] = GPIO.PWM(servo, 50)
    pwms[servo].start(0)


def cleanup():
    for pwm in pwms:
        pwm.stop()
    GPIO.cleanup()


def panRight():
    global panAngle
    if panAngle - PAN_GAP < PAN_MIN:
        return

    panAngle -= PAN_GAP
    set_angle(PAN, panAngle)


def panLeft():
    global panAngle

    if panAngle + PAN_GAP > PAN_MAX:
        return

    panAngle += PAN_GAP
    set_angle(PAN, panAngle)


def tiltDown():
    global tiltAngle
    if tiltAngle - TILT_GAP < TILT_MIN:
        return

    tiltAngle -= TILT_GAP
    set_angle(TILT, tiltAngle)


def tiltUp():
    global tiltAngle
    if tiltAngle + TILT_GAP > TILT_MAX:
        return

    tiltAngle += TILT_GAP
    set_angle(TILT, tiltAngle)


def reset():
    set_angle(TILT, 90)
    set_angle(PAN, 90)

    global tiltAngle
    global panAngle
    tiltAngle = 90
    panAngle = 90


def set_angle(gpio, angle):
    print("Setting angle of %s  to angle %s " % (gpio, angle))
    duty = angle / 18 + 2
    GPIO.output(gpio, True)
    pwms[gpio].ChangeDutyCycle(duty)
    # sleep(0.3)
    # GPIO.output(gpio, False)
    # pwms[gpio].ChangeDutyCycle(0)
