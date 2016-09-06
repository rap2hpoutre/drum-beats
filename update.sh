#!/bin/sh

git pull origin master
cargo build --release

npm run build


service supervisor restart