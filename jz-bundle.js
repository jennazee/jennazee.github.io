(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Triangler = require('./triangler.js');

var triangler = new Triangler();

console.log(triangler);
triangler.makeTopSvg();

},{"./triangler.js":2}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Triangler = function () {
  function Triangler() {
    _classCallCheck(this, Triangler);

    this.FUSCHIA = '#bd10e0';
    this.AQUA = '#50e3c2';
    this.PURPLE = '#9013fe';
    this.GREEN = '#b8e986';
    this.TRIANGLE_INTERVAL = 100;
  }

  _createClass(Triangler, [{
    key: 'getRandomFromInterval',
    value: function getRandomFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: 'getRandomOpacityFromInterval',
    value: function getRandomOpacityFromInterval(min, max) {
      return Math.random() * (max - min) + min;
    }
  }, {
    key: 'makeTop',
    value: function makeTop() {
      var _this = this;

      var topCanvas = document.getElementById("TopCanvas");
      if (topCanvas.getContext) {
        (function () {
          var ctx = topCanvas.getContext('2d');
          var colors = [_this.FUSCHIA, _this.AQUA, _this.PURPLE, _this.GREEN];

          colors.map(function (color, index) {
            var width = _this.getRandomFromInterval(_this.TRIANGLE_INTERVAL, 350);
            ctx.beginPath();
            ctx.moveTo(_this.TRIANGLE_INTERVAL * index, 0);
            ctx.lineTo(width, 0);
            ctx.lineTo(width / 2, 105);
            ctx.fill();
          });
        })();
      }
    }
  }, {
    key: 'makeTopSvg',
    value: function makeTopSvg() {
      var _this2 = this;

      var svgns = "http://www.w3.org/2000/svg";
      var colors = [this.FUSCHIA, this.AQUA, this.PURPLE, this.GREEN];

      colors.map(function (color, index) {
        var shape = document.createElementNS(svgns, "polygon");

        var width = _this2.getRandomFromInterval(_this2.TRIANGLE_INTERVAL, 500);
        var height = _this2.getRandomFromInterval(50, 150);
        var start = _this2.TRIANGLE_INTERVAL * index;
        var stop = start + width;
        var midpoint = (stop + start) / 2;
        var points = start + ',0 ' + stop + ',0 ' + midpoint + ',' + height;

        var opacity = _this2.getRandomOpacityFromInterval(0.5, 0.9);

        shape.setAttributeNS(null, "points", points);
        shape.setAttributeNS(null, "fill", color);
        shape.setAttributeNS(null, "fill-opacity", opacity);
        document.getElementById('TopSvg').appendChild(shape);
      });
    }
  }, {
    key: 'makeBottom',
    value: function makeBottom() {}
  }]);

  return Triangler;
}();

module.exports = Triangler;

},{}]},{},[1]);
