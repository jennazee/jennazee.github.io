function PaddleBrick() {
 	Brick.call(this);
 	this.type = 'paddlez';
 	this.points = 10;
 	this.color = '#FF3333';
 }
 
PaddleBrick.prototype = new Brick();

PaddleBrick.prototype.constructor = PaddleBrick;