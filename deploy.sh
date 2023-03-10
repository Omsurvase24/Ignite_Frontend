#!/bin/bash

zip -q -r build.zip build

scp -r build.zip root@68.183.94.121:~
ssh -o StrictHostKeyChecking=no root@68.183.94.121 "unzip build.zip && sudo cp -r build/* /usr/share/nginx/frontend/ && sudo service nginx reload && rm build.zip && rm -rf build && exit"
rm build.zip