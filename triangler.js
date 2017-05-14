const svgns = "http://www.w3.org/2000/svg";
const RED = 'rgb(212, 29, 0)';
const ORANGE = 'rgb(255, 147, 0)';
const YELLOW = 'rgb(255, 255, 0)';
const VIOLET = 'rgb(148, 33, 148)';
const TRIANGLE_INTERVAL = 100;
const TRIANGLE_MAX_WIDTH = 300;
const TRIANGLE_MIN_HEIGHT = 50;
const TRIANGLE_MAX_HEIGHT = 150;

export default class Triangler {
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
    const shape = document.createElementNS(svgns, "polygon");

    const width = this.getRandomFromInterval(TRIANGLE_INTERVAL, TRIANGLE_MAX_WIDTH);
    const height = this.getRandomFromInterval(TRIANGLE_MIN_HEIGHT, TRIANGLE_MAX_HEIGHT);
    const start = TRIANGLE_INTERVAL * index;
    const stop = start + width;
    const midpoint = (stop + start)/2;
    const points = `${start},0 ${stop},0 ${midpoint},${height}`;

    const opacity = this.getRandomOpacityFromInterval(0.5, 0.9);

    shape.setAttributeNS(null, 'points', points);
    shape.setAttributeNS(null, 'fill', color);
    shape.setAttributeNS(null, 'fill-opacity', opacity);

    return shape;
  }

  makeTopSvg() {
    const topSvg = document.getElementById('TopSvg');
    this.colors.forEach((color, index) => {
      const shape = this.drawTriangle(index, color);
      topSvg.appendChild(shape);
    });
  }

  drawTrianglesFromIndex() {
    const bottomSvg = document.getElementById('BottomSvg');
    while (this.bottomTriangleIndex * TRIANGLE_INTERVAL < this.bottomTriangleSpan) {
      const color = this.colors[this.bottomTriangleIndex % 4];
      const shape = this.drawTriangle(this.bottomTriangleIndex, color);
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
