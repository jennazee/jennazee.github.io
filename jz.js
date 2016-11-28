'use strict';

// browserify jz.js -o jz-bundle.js -t [ babelify --presets [ es2015 ] ] -t uglifyify

let Triangler = require('./triangler.js');

let triangler = new Triangler;

triangler.makeTopSvg();
triangler.makeBottomSvg();