# Raspberry Pi remote controlled car with rotating webcam

![Alt text](pictures/1.jpg?raw=true "Car")

### Video on YouTube
[Link to YouTube](http://www.youtube.com/watch?v=vOVKgLQbhpc)


[![](http://img.youtube.com/vi/vOVKgLQbhpc/0.jpg)](http://www.youtube.com/watch?v=vOVKgLQbhpc "Raspberry Pi car")

### How does it work?
1. Turn on powerbank
2. rPi starts a http server using socket.io on port 8080
3. rPi starts a live-stream from webcam on port 8081
4. Connect from some PC via browser to <rPi_IP_address>:8080
5. You will see a live-stream from webcam in your browser
6. Move a car using WSAD and move a camera turret using IKJL
 
### Hardware used:
* Raspberry Pi 3 B+
* USB WebCam - Logitech C160, without plastic housing, 640x480px, 30FPS
* 2-channel motor driver - L298N (12V/2A)
* Regular powerbank as a power supply for rPi, motors and servos.
* Magican Chassis
* Pan/Tilt camera turret - 3D printed model designed by me (available in this repo) in SketchFab
* Small breadboard for connections

![Alt text](pictures/turret_comparsion.PNG?raw=true "Camera turret project in SketchFab vs reality")



### How does the video streaming work?
I installed MJPEG-Streamer on rPi. It's easy to use and performance is good. (I tried to use *Motion*, but performance was not good enough).
How to install:
```
# Update & Install Tools
sudo apt-get update
sudo apt-get install build-essential libjpeg8-dev imagemagick libv4l-dev cmake -y

# Clone Repo in /tmp
cd /tmp
git clone https://github.com/jacksonliam/mjpg-streamer.git
cd mjpg-streamer/mjpg-streamer-experimental

# Make
make
sudo make install
```
(Source: https://github.com/cncjs/cncjs/wiki/Setup-Guide:-Raspberry-Pi-%7C-MJPEG-Streamer-Install-&-Setup-&-FFMpeg-Recording)

Once it is installed you can start a streaming using the following command:
```/usr/local/bin/mjpg_streamer -i "input_uvc.so -r 640x480 -d /dev/video0 -f 30 -q 80" -o "output_http.so -p 8081 -w /usr/local/share/mjpg-streamer/www"```
Now you can access camera stream from any PC in the same network by entering in web browser http://<ip_address>:8081/?action=stream

### How does server side works (controlling the car)?
To run a server execute the following cmd:
```python3 -u web_input.py```

It will start a htpp server using socket.io and it will wait for socket.io client.
Once the client connects, by entering <ip_address>:8080 a server will sit and wait for messages such as *forward*, *backward*, *left*, *right*, *stop*, *tiltDown*, *tiltUp* and so on. After server received some action from user it will perform a required action using RPi.GPIO library. Please examine web_input.py, lib/turret.py and lib/car.py for details.

### How does client side works?
Client-side requried only socket.io JavaScript client library for sending messages to server and static/input.js script that reads input from user's keyboard.
When user presses down the button script will send the message to server.

### How to configure the car server to startup when rPi boots up?
If you want you can add it as a service, so it will start after rPi boots up. Create a file:
```/lib/systemd/system/car.service```
with content:
```
[Unit]
Description=Car app

[Service]
Environment=XDG_RUNTIME_DIR=/run/user/1000
ExecStart=/bin/bash -c 'python3 -u web_input.py'
WorkingDirectory=/home/pi/car
Restart=always
User=pi

[Install]
WantedBy=multi-user.target
```
Then enable your service:
```sudo systemctl enable car.service```
Now it will start after next startup. You can manually stop, start and check the status using:
```
sudo service car stop
sudo service car start
sudo service car status
```

### Some pictures
![Alt text](pictures/2.jpg?raw=true "Car2")
![Alt text](pictures/3.jpg?raw=true "Car")
![Alt text](pictures/skechup.PNG?raw=true "Project in SketchFab")
