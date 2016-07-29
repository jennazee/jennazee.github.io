'use strict';

class Triangler {
  constructor() {
    this.FUSCHIA = '#bd10e0';
    this.AQUA = '#50e3c2';
    this.PURPLE = '#9013fe';
    this.GREEN = '#b8e986';
    this.TRIANGLE_INTERVAL = 100;
    this.TRIANGLE_MAX_WIDTH = 200;
    this.TRIANGLE_MIN_HEIGHT = 50;
    this.TRIANGLE_MAX_HEIGHT = 150;
  }

  getRandomFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomOpacityFromInterval(min, max) {
    return Math.random() * (max - min) + min;
  }

  makeTopSvg() {
    const svgns = "http://www.w3.org/2000/svg";
    const colors = [this.FUSCHIA, this.AQUA, this.PURPLE, this.GREEN];

    colors.map(this.makeTriangle);
  }

  makeBottomSvg() {
    const svgns = "http://www.w3.org/2000/svg";
    const colors = [this.FUSCHIA, this.AQUA, this.PURPLE, this.GREEN];

    // store this sp we can check if we need to draw new triangles on resize
    this.currentDocWidth = document.body.clientWidth;

    let numTriangles = this.currentDocWidth % this.TRIANGLE_INTERVAL;


  }

  makeTriangle(color, index) {
    let shape = document.createElementNS(svgns, "polygon");

    let width = this.getRandomFromInterval(this.TRIANGLE_INTERVAL, this.TRIANGLE_MAX_WIDTH);
    let height = this.getRandomFromInterval(this.TRIANGLE_MIN_HEIGHT, this.TRIANGLE_MAX_HEIGHT);

    let start = this.TRIANGLE_INTERVAL * index;
    let stop = start + width;
    let midpoint = (stop + start)/2
    let points = `${start},0 ${stop},0 ${midpoint},${height}`;

    let opacity = this.getRandomOpacityFromInterval(0.5, 0.9);

    shape.setAttributeNS(null, "points", points);
    shape.setAttributeNS(null, "fill", color);
    shape.setAttributeNS(null, "fill-opacity", opacity);
    document.getElementById('TopSvg').appendChild(shape);
  }
}

module.exports = Triangler;
