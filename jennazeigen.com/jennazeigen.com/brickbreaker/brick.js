function Brick() {
	this.width = 50;
	this.height = 25;
	this.points = 10;
	this.y = 0;
	this.x = 0;
	this.type = 'normal'; //options: normal, golden, double; related to points
	this.color = '#00CCCC';
};

Brick.prototype.drawBrick = function(){
	var canvas = $('#mainCanvas')[0];
	this.ctx = canvas.getContext('2d');	
	this.ctx.strokeStyle = '#333333';
	this.ctx.lineWidth = 2;
	this.ctx.fillStyle = this.color;
	
	if (this.type === 'empty'){
		this.ctx.fillStyle = '#333333';
	}
	
		this.ctx.fillRect(this.x*this.width, this.y*this.height, this.width, this.height);
		this.ctx.strokeRect(this.x*this.width, this.y*this.height, this.width, this.height);
};
