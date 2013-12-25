function Game(){
	//variables that change depending on game state
	this.scoreCounter = 0;
	this.level = 1;
	this.lives = 3;
	this.ball = new Ball();
	paddle.width = 120 - 10*this.level;
	this.ball.speed = this.ball.speed + this.level-1;
	this.dialog = new Dialog();
}
// global variables for App() access
var paddle = {
		x: 200,
		y: 585,
		color: '#FF3333',
		move: 30,
		width: 110
};

//game starts paused; users click dialog box or hit space bar to start it
var go = {
	status: 'pause'  //options: play, pause, over 
};

var rows = 4;
var columns = 12;
var board = Array();

Game.prototype.refreshBoard = function(type) {
		//if new game, then put things back to default that may have changed
		if (type === 'new'){
			this.level = 1;  //changing this will put the paddle and ball back to default as ball and paddle state are determined by 
			this.ball.x= 250;
			this.ball.y = 585-12;
			go.status = 'pause';
			this.lives = 3;
			this.scoreCounter = 0;
			paddle.x=200;
			paddle.y= 585;
		}
		//reset the board state: ball back on paddle, all the bricks there
			//redo board
			var canvas = $('#mainCanvas');
			canvas.attr('width', canvas.width()); 
			canvas.attr('height', canvas.height());
			this.ctx.fillStyle = '#333333';
			this.ctx.fillRect(0, 0, 600, 600);
			//reset ball in middle of paddle
			this.ball.x = paddle.x + paddle.width/2;
			this.ball.y = 573;
			this.ctx.beginPath();
			this.ctx.fillStyle = this.ball.color;
			this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius,0,2*Math.PI);
			this.ctx.fill();
			//redraw paddle
			this.ctx.fillStyle = paddle.color;
			this.ctx.fillRect(paddle.x, paddle.y, paddle.width, 15);
			//redraw score board
			this.ctx.fillStyle = '#191919';
			this.ctx.fillRect(600, 0, 200,600);
			this.ctx.font = '30px Century Gothic'
			this.ctx.fillStyle = '#FF3333';
			this.ctx.fillText('Level: '+ this.level, 620, 40, 185);
			this.ctx.fillStyle = this.ball.color;
			this.ctx.fillText('Score: '+ this.scoreCounter, 620, 80, 185);
			this.ctx.fillStyle = '#00CCCC';
			this.ctx.fillText('Lives Left: ' + (this.lives-1), 620, 120, 185);
			//reset brick array
			makeBricks();
	}

//cycles through the board array to check if all the cells have the type 'empty', which means they have all be hit/exploded
function checkWin(){
	for (var j=0; j<rows; j++){ 
		for (var i=0; i<columns; i++){ 
			if (board[j][i].type!=='empty'){
				return
			}
		}
	}
	//still here? you win.
	return true;
}
			
Game.prototype.init = function(){
	var canvas = $('#mainCanvas')[0];
  if(canvas.getContext){
    	/* This is the 2d rendering context you will be drawing on. */
		this.ctx = canvas.getContext('2d');
		
		// reset canvas for good measure
		//background
		this.ctx.fillStyle = '#333333'
		this.ctx.fillRect(0,0,600,600);
		
		//score panel
		this.ctx.fillStyle = '#191919';
		this.ctx.fillRect(600, 0, 200,600);
		this.ctx.font = '30px Century Gothic, Calibri'
		this.ctx.fillStyle = '#FF3333';
		this.ctx.fillText('Level: '+ this.level, 620, 40, 185);
		this.ctx.fillStyle = this.ball.color;
		this.ctx.fillText('Score: '+ this.scoreCounter, 620, 80, 185);
		this.ctx.fillStyle = '#00CCCC';
		this.ctx.fillText('Lives Left: ' + (this.lives-1), 620, 120, 185);
		
		//welcome dialog
		this.ctx.fillStyle= this.dialog.color;
		this.ctx.fillRect(this.dialog.x, this.dialog.y, this.dialog.width, this.dialog.height);
		this.ctx.fillStyle = 'Black';
		this.ctx.font = '22px Century Gothic, Calibri';
		this.ctx.fillText('Click to Break Some Bricks!', this.dialog.x + 10, this.dialog.y+50, 280);
		this.ctx.font = '14px Century Gothic, Calibri';
		this.ctx.fillText('Move the paddle with arrow keys', this.dialog.x + 35, this.dialog.y+80, 230);
		this.ctx.fillText('Pause/unpause/launch with the space bar', this.dialog.x + 10, this.dialog.y+100, 280);
		this.ctx.fillText('Restart the game by pressing " r "', this.dialog.x + 35, this.dialog.y+120, 230);
		//paddle
		this.ctx.fillStyle = paddle.color;
		this.ctx.fillRect(paddle.x, paddle.y, paddle.width, 15);
		
		//ball
		this.ctx.fillStyle = this.ball.color;
		this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius,0,2*Math.PI);
		this.ctx.fill();
		
		//bricks
		makeBricks();
		
		return true;
	}
	return false;
}

function makeBricks(){
		var canvas = $('#mainCanvas')[0];
		this.ctx = canvas.getContext('2d');
		
		this.ctx.fillStyle = '#00CCCC';
		this.ctx.strokeStyle = '#333333';
		this.ctx.lineWidth = 2;
		//all levels have four rows of bricks
		
		for (var j=0; j<rows; j++){ 
			board[j]= new Array();
			for (var i=0; i<columns; i++){ 
				board[j][i]= new Brick();
				board[j][i].x = i;
				board[j][i].y = j;
				board[j][i].drawBrick();
			}
		}
			
		// Now for the randomly placed special bricks! 
		// Yes, by this method, special bricks might coincide. Sucks for the player :(
		row = Math.floor(Math.random()*4);
		col = Math.floor(Math.random()*12);
		board[row][col] = new GoldenBrick();
		board[row][col].x = col;
		board[row][col].y = row;
		board[row][col].drawBrick();
		
		row = Math.floor(Math.random()*4);
		col = Math.floor(Math.random()*12);
		board[row][col] = new DoubleBrick();
		board[row][col].x = col;
		board[row][col].y = row;
		board[row][col].drawBrick();
		
		row = Math.floor(Math.random()*4);
		col = Math.floor(Math.random()*12);
		board[row][col] = new DoubleBrick();
		board[row][col].x = col;
		board[row][col].y = row;
		board[row][col].drawBrick();
		
		
		row = Math.floor(Math.random()*4);
		col = Math.floor(Math.random()*12);
		board[row][col] = new DoubleBrick();
		board[row][col].x = col;
		board[row][col].y = row;
		board[row][col].drawBrick();
		
		
		//they're gonna be hidden treasures!
		row = Math.floor(Math.random()*4);
		col = Math.floor(Math.random()*12);
		board[row][col] = new ExplodingBrick();
		board[row][col].x = col;
		board[row][col].y = row;
		board[row][col].drawBrick();
		
		row = Math.floor(Math.random()*4);
		col = Math.floor(Math.random()*12);
		board[row][col] = new PaddleBrick();
		board[row][col].x = col;
		board[row][col].y = row;
		board[row][col].drawBrick();
		
		row = Math.floor(Math.random()*4);
		col = Math.floor(Math.random()*12);
		board[row][col] = new BallBrick();
		board[row][col].x = col;
		board[row][col].y = row;
		board[row][col].drawBrick();
		
		if (this.level === 3){
			row = Math.floor(Math.random()*4);
			col = Math.floor(Math.random()*12);
			board[row][col] = new LivesBrick();
			board[row][col].x = col;
			board[row][col].y = row;
			board[row][col].drawBrick();
		}
		
		if (this.level === 3){
			row = Math.floor(Math.random()*4);
			col = Math.floor(Math.random()*12);
			board[row][col] = new LivesBrick();
			board[row][col].x = col;
			board[row][col].y = row;
			board[row][col].drawBrick();
		}
}

Game.prototype.draw = function(){
	var canvas = $('#mainCanvas');
	// TODO: put all your drawing code here
	if (go.status === 'play') {
		//wipe canvas
		canvas.attr('width', canvas.width()); 
		canvas.attr('height', canvas.height());
		//background
		this.ctx.fillStyle = '#333333'
		this.ctx.fillRect(0,0,600,600);
			
		//score panel
		this.ctx.fillStyle = '#191919';
		this.ctx.fillRect(600, 0, 200,600);
		this.ctx.font = '30px Century Gothic, Calibri'
		this.ctx.fillStyle = this.dialog.color;
		this.ctx.fillText('Level: '+ this.level, 620, 40, 185);
		this.ctx.fillStyle = this.ball.color;
		this.ctx.fillText('Score: '+ this.scoreCounter, 620, 80, 185);
		this.ctx.fillStyle = '#00CCCC';
		this.ctx.fillText('Lives Left: ' + (this.lives-1), 620, 120, 185);
		
		//ball
		this.ctx.beginPath();
		this.ctx.fillStyle = this.ball.color;
		this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius,0,2*Math.PI);
		this.ctx.fill();
		
		//paddle
		this.ctx.fillStyle = paddle.color;
		this.ctx.fillRect(paddle.x, paddle.y, paddle.width, 15);
		
		//draw bricks
		for (var j=0; j<rows; j++){
			for (var i=0; i<columns; i++){
				if (board[j][i].type!=='empty') {
					board[j][i].drawBrick();
				}
			}
		}
	}
}

Game.prototype.update = function(){
	// TODO: put all your logical updates here
	if (go.status === 'play') {
		//ball updates location
		this.ball.x = this.ball.x + this.ball.speed * this.ball.xDir;
		this.ball.y = this.ball.y + this.ball.speed * this.ball.yDir;
	
		for (var col = 0; col<columns; col++){
			for (var row = rows-1; row >=0; row--){
				var brick = board[row][col];
			 	if (board[row][col].type =='empty'){
					continue;
				}
				if (this.ball.x + this.ball.radius < brick.x*brick.width || this.ball.x - this.ball.radius > brick.x*brick.width + brick.width){
					continue;
				}
				if (this.ball.y + this.ball.radius < brick.y*brick.height || this.ball.y - this.ball.radius > brick.y*brick.height + brick.height){
					continue;
				}
				//still here? it's a hit!
				this.scoreCounter = this.scoreCounter + board[row][col].points;
				if (brick.type === 'exploding'){
					console.log('explosion!');
					if (board[col][row]){
						board[col][row].type='empty';
					}
					if (board[row-1][col+1]){
						board[row-1][col+1].type='empty';
					}
					if (board[col-1][row+1]){
						board[col-1][row+1].type='empty';
					}
				}
				if (brick.type === 'paddlez'){
					if (paddle.x + paddle.width > 500){
						paddle.x = paddle.x-15;
						paddle.width = paddle.width + 15;
					}
					else {
						paddle.width = paddle.width + 15;
					}
				}
				if (brick.type === 'ballz'){ //yep.
					this.ball.speed = this.ball.speed - 0.5;
				}
				if (brick.type === 'livez'){
					this.lives++;
				}
				
				board[row][col].type = 'empty';
				if (checkWin()) {
					go.status = 'pause';
					this.refreshBoard('level-up');
					this.ctx.fillStyle = this.dialog.color;
					this.ctx.fillRect(this.dialog.x, this.dialog.y, this.dialog.width, this.dialog.height);
					this.ctx.font = '30px Century Gothic, Calibri'
					this.ctx.fillStyle = 'black';
					this.ctx.fillText('Level Up!', this.dialog.x + 80, this.dialog.y+50, 220);
					this.ctx.font = '14px Century Gothic, Calibri'
					this.ctx.fillStyle = 'black';
					this.ctx.fillText('Click here to start the new level!', this.dialog.x + 40, this.dialog.y+100, 220);
					this.level++;
				}
				brick.points = 0;
				this.ball.yDir = Math.abs(this.ball.yDir);
			}
		}
	
		//did it hit the paddle?
		if (this.ball.y+this.ball.radius > paddle.y && this.ball.x+this.ball.radius >= paddle.x && this.ball.x-this.ball.radius <= paddle.x+paddle.width){
			this.ball.yDir = this.ball.yDir*-1;
			if (this.ball.x > paddle.width/2+paddle.x){
 				this.ball.xDir = -this.ball.xDir;
			}
		}
		
		//did it hit the side edge of the canvas? Turn around or DIE!
		if (this.ball.x - this.ball.radius < 0 || this.ball.x > 600-this.ball.radius) {
			this.ball.xDir = this.ball.xDir * -1;
		}
		
		//did it hit the top of the canvas?
		else if (this.ball.y - this.ball.radius <= 0) {
			this.ball.yDir = this.ball.yDir*-1;
			}
			
		//did you go off the bottom? lose a life, show the player, and reset the ball to be on the paddle 
		//and wait for the user to launch again
		else if (this.ball.y + this.ball.radius > 600) {
			this.lives--;
			go.status = 'pause';
			this.ball.x = paddle.x + paddle.width/2;
			this.ball.y = 573;
			this.ctx.fillStyle = '#333333';
			this.ctx.fillRect(0, 570, 600, 30);
			this.ctx.beginPath();
			this.ctx.fillStyle = this.ball.color;
			this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius,0,2*Math.PI);
			this.ctx.fill();
			this.ctx.fillStyle = paddle.color;
			this.ctx.fillRect(paddle.x, paddle.y, paddle.width, 15);
			this.ctx.fillStyle = '#191919';
			this.ctx.fillRect(600, 0, 200,600);
			this.ctx.font = '30px Century Gothic'
			this.ctx.fillStyle = this.dialog.color;
			this.ctx.fillText('Level: '+ this.level, 620, 40, 185);
			this.ctx.fillStyle = this.ball.color;
			this.ctx.fillText('Score: '+ this.scoreCounter, 620, 80, 185);
			
			//if you've used up all your lives, game over :(
			if (this.lives === 0) {
				go.status = 'over';
				this.ctx.fillStyle = this.dialog.color;
				this.ctx.fillRect(this.dialog.x, this.dialog.y, this.dialog.width, this.dialog.height);
				this.ctx.font = '30px Century Gothic, Calibri'
				this.ctx.fillStyle = 'black';
				this.ctx.fillText('Game Over.', this.dialog.x + 60, this.dialog.y+50, 220);
				this.ctx.font = '14px Century Gothic, Calibri'
				this.ctx.fillStyle = 'black';
				this.ctx.fillText('Press space to start a new game!', this.dialog.x + 40, this.dialog.y+100, 220);
				this.lives = 0;
				this.ctx.font = '30px Century Gothic, Calibri'
				this.ctx.fillStyle = '#00CCCC';
				this.ctx.fillText('Lives Left: ' + (this.lives), 620, 120, 185);
				return;
			}
			this.ctx.font = '30px Century Gothic, Calibri'
			this.ctx.fillStyle = '#00CCCC';
			this.ctx.fillText('Lives Left: ' + (this.lives-1), 620, 120, 185);
		}
	}
}