function BallBrick() {
 	Brick.call(this);
 	this.type = 'ballz';
 	this.points = 10;
 	this.color = '#CCFF00';
 }
 
BallBrick.prototype = new Brick();

BallBrick.prototype.constructor = BallBrick;