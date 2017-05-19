#!/bin/bash

browserify glitchrothko.js -o glitchrothko-bundle.js -t [ babelify --presets [ es2015 ] ] -t uglifyify
cp ./node_modules/huemanities/glitchrothko.html glitchrothko.html
cp ./node_modules/huemanities/huemanity.css huemanity.css
