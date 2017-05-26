#!/bin/bash

browserify basiccolorterminal.js -o bct-bundle.js -t [ babelify --presets [ es2015 ] ] -t uglifyify
cp ./node_modules/huemanities/basiccolorterminal.html basiccolorterminal.html
cp ./node_modules/huemanities/huemanity.css huemanity.css