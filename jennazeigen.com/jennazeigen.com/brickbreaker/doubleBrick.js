function DoubleBrick() {
 	Brick.call(this);
 	this.type = 'double';
 	this.points = 20;
 	this.color = '#FF3399';
 }
 
DoubleBrick.prototype = new Brick();

DoubleBrick.prototype.constructor = DoubleBrick;