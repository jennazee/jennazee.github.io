function ExplodingBrick() {
 	Brick.call(this);
 	this.type = 'double';
 	this.points = 20;
 	this.color = '#00CCCC';
 }
 
ExplodingBrick.prototype = new Brick();
ExplodingBrick.prototype.constructor = ExplodingBrick;