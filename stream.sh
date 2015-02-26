#!/bin/sh

echo "stream.sh executed..."
cd /home/root/mjpg-streamer-r63/
./mjpg_streamer -i "./input_uvc.so -f 15 -r 640x480" -o "./output_http.so -w ./www"
echo "stream.sh finished!"
