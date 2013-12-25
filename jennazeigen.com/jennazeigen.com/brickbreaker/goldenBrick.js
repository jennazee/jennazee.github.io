function GoldenBrick() {
 	Brick.call(this);
 	this.type = 'golden';
 	this.points = 75;
 	this.color = 'gold';
 }
 
GoldenBrick.prototype = new Brick();

GoldenBrick.prototype.constructor = GoldenBrick;