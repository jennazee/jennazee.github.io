'use strict';

const svgns = "http://www.w3.org/2000/svg";
const RED = 'rgb(212, 29, 0)';
const ORANGE = 'rgb(255, 147, 0)';
const YELLOW = 'rgb(255, 255, 0)';
const VIOLET = 'rgb(148, 33, 148)';
const TRIANGLE_INTERVAL = 100;
const TRIANGLE_MAX_WIDTH = 300;
const TRIANGLE_MIN_HEIGHT = 50;
const TRIANGLE_MAX_HEIGHT = 150;

class Triangler {
  constructor() {
    this.colors = [VIOLET, RED, ORANGE, YELLOW];
    this.bottomTriangleSpan = window.innerWidth;
    this.bottomTriangleIndex = 0;
  }

  setup() {
    this.makeTopSvg();
    this.makeBottomSvg();
  }

  getRandomFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomOpacityFromInterval(min, max) {
    return Math.random() * (max - min) + min;
  }

  drawTriangle(index, color) {
    let shape = document.createElementNS(svgns, "polygon");

    let width = this.getRandomFromInterval(TRIANGLE_INTERVAL, TRIANGLE_MAX_WIDTH);
    let height = this.getRandomFromInterval(TRIANGLE_MIN_HEIGHT, TRIANGLE_MAX_HEIGHT);
    let start = TRIANGLE_INTERVAL * index;
    let stop = start + width;
    let midpoint = (stop + start)/2;
    let points = `${start},0 ${stop},0 ${midpoint},${height}`;

    let opacity = this.getRandomOpacityFromInterval(0.5, 0.9);

    shape.setAttributeNS(null, 'points', points);
    shape.setAttributeNS(null, 'fill', color);
    shape.setAttributeNS(null, 'fill-opacity', opacity);

    return shape;
  }

  makeTopSvg() {
    let topSvg = document.getElementById('TopSvg');
    this.colors.forEach((color, index) => {
      let shape = this.drawTriangle(index, color);
      topSvg.appendChild(shape);
    });
  }

  drawTrianglesFromIndex() {
    let bottomSvg = document.getElementById('BottomSvg');
    while (this.bottomTriangleIndex * TRIANGLE_INTERVAL < this.bottomTriangleSpan) {
      let color = this.colors[this.bottomTriangleIndex % 4];
      let shape = this.drawTriangle(this.bottomTriangleIndex, color);
      bottomSvg.appendChild(shape);
      this.bottomTriangleIndex++;
    }
  }

  makeBottomSvg() {
    this.drawTrianglesFromIndex();

    window.addEventListener('resize', (e) => {
      if (this.bottomTriangleSpan < window.innerWidth) {
        window.requestAnimationFrame(this.drawTrianglesFromIndex.bind(this));
        this.bottomTriangleSpan = window.innerWidth;
      }
    });
  }
}

module.exports = Triangler;
