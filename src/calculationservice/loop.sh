#!/bin/bash

while true
do
        echo "Run consume:"
        ./consumeCandleData
        echo "Sleeping for 15 sec. Press [CTRL+C] to stop."
        sleep 15
done
