function LivesBrick() {
 	Brick.call(this);
 	this.type = 'double';
 	this.points = 20;
 	this.color = '#00CCCC';
 }
 
LivesBrick.prototype = new Brick();
LivesBrick.prototype.constructor = LivesBrick;