#!/bin/sh

cd /home/www/drum-beats
git pull origin master
cargo build --release

(cd react-app && npm install)
(cd react-app && npm run build)
cp -Rf react-app/build/static/* static/
cat react-app/build/index.html > resources/index.html

service supervisor restart