'use strict';

class Triangler {
  constructor() {
    this.FUSCHIA = '#bd10e0';
    this.AQUA = '#50e3c2';
    this.PURPLE = '#9013fe';
    this.GREEN = '#b8e986';
    this.VIOLET = 'rgb(148, 33, 148)';
    this.RED = 'rgb(212, 29, 0)';
    this.ORANGE = 'rgb(255, 147, 0)';
    this.YELLOW = 'rgb(255, 255, 0)';
    this.colors = [this.VIOLET, this.RED, this.ORANGE, this.YELLOW];
    this.TRIANGLE_INTERVAL = 100;
    this.TRIANGLE_MAX_WIDTH = 300;
    this.TRIANGLE_MIN_HEIGHT = 50;
    this.TRIANGLE_MAX_HEIGHT = 150;
    this.bottomTriangleSpan = window.innerWidth;
    this.bottomTriangleIndex = 0;
  }

  getRandomFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomOpacityFromInterval(min, max) {
    return Math.random() * (max - min) + min;
  }

  makeTopSvg() {
    const svgns = "http://www.w3.org/2000/svg";

    this.colors.map((color, index) => {
      let shape = document.createElementNS(svgns, "polygon");

      let width = this.getRandomFromInterval(this.TRIANGLE_INTERVAL, this.TRIANGLE_MAX_WIDTH);
      let height = this.getRandomFromInterval(this.TRIANGLE_MIN_HEIGHT, this.TRIANGLE_MAX_HEIGHT);
      let start = this.TRIANGLE_INTERVAL * index;
      let stop = start + width;
      let midpoint = (stop + start)/2
      let points = `${start},0 ${stop},0 ${midpoint},${height}`;

      let opacity = this.getRandomOpacityFromInterval(0.5, 0.9)

      shape.setAttributeNS(null, "points", points);
      shape.setAttributeNS(null, "fill", color);
      shape.setAttributeNS(null, "fill-opacity", opacity);
      document.getElementById('TopSvg').appendChild(shape);
    })
  }

  drawTrianglesFromIndex(svg) {
    while (this.bottomTriangleIndex * this.TRIANGLE_INTERVAL < this.bottomTriangleSpan) {
      let shape = document.createElementNS(svg, "polygon");

      let width = this.getRandomFromInterval(this.TRIANGLE_INTERVAL, this.TRIANGLE_MAX_WIDTH);
      let height = this.getRandomFromInterval(this.TRIANGLE_MIN_HEIGHT, this.TRIANGLE_MAX_HEIGHT);
      let start = this.TRIANGLE_INTERVAL * this.bottomTriangleIndex;
      let stop = start + width;
      let midpoint = (stop + start)/2
      let points = `${start},0 ${stop},0 ${midpoint},${height}`;

      let opacity = this.getRandomOpacityFromInterval(0.5, 0.9)

      shape.setAttributeNS(null, "points", points);
      shape.setAttributeNS(null, "fill", this.colors[this.bottomTriangleIndex % 4]);
      shape.setAttributeNS(null, "fill-opacity", opacity);
      document.getElementById('BottomSvg').appendChild(shape);
      this.bottomTriangleIndex++;
    }
  }

  makeBottomSvg() {
    const svgns = "http://www.w3.org/2000/svg";

    this.drawTrianglesFromIndex(svgns);

    var self = this;
    window.addEventListener('resize', function(e) {
      if (self.bottomTriangleSpan < window.innerWidth) {
        self.drawTrianglesFromIndex(svgns);
        self.bottomTriangleSpan = window.innerWidth;
      }
    })
  }
}

module.exports = Triangler;
