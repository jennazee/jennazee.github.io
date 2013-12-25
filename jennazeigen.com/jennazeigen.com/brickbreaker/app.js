function App(){
	var game_loop = start();
	var game;
	// Set up keyboard interaction
	// var keys = {};
	//document.onkeydown = function(e) { keys[e.which] = true };
	//document.onkeyup = function(e) { keys[e.which] = false };
	
	$(document).keydown(function(e) { 
		// if the game is in play, left arrow moves paddle left
		if (e.keyCode === 37) {
			if (go.status==='play'){
				e.preventDefault();
				if (paddle.x - paddle.move > 0){
					paddle.x = paddle.x - paddle.move;
				}
				else {
    			paddle.x = 0;
    		}
			}
  	}
  	// if the game is in play, right arrow moves paddle right
  	if (e.keyCode === 39) {
  		e.preventDefault();
    	if (go.status === 'play'){
				if (paddle.x + paddle.move <= 600-paddle.width){
					paddle.x = paddle.x + paddle.move;
				}
				else {
					paddle.x = 600-paddle.width;
				}
			}
  	}
  	
  	//space bar for pause
		if (e.keyCode === 32) {
  		e.preventDefault();
    	if (go.status === 'play'){
    		go.status = 'pause'
    	}
    	else if (go.status === 'over'){
    		go.status = 'pause'
    		clearInterval(game_loop);
  			var canvas = $('#mainCanvas');
				canvas.attr('width', canvas.width()); 
				canvas.attr('height', canvas.height());
  			game_loop = start();
    	}
    	else {
    		go.status = 'play';
    	}
  	}
  	
  	//r for restart, dunno why you would want this... plus it does something a *little* wonky
  	if (e.keyCode === 82) {
  	  go.status = 'pause';
  		clearInterval(game_loop);
  		var canvas = $('#mainCanvas');
			canvas.attr('width', canvas.width()); 
			canvas.attr('height', canvas.height());
  		game_loop = start();
  	}
	});
	
	//makes a clickable dialog box
	$('#mainCanvas').click(function(e){
		var x = e.pageX-$('#mainCanvas').offset().left;
		var y = e.pageY-$('#mainCanvas').offset().top;
		if (x >= 150 && x<150+300 && y>= 175 && y<=175+150 && (go.status === 'pause' || go.status === 'over')){
			if (go.status === 'pause'){
				go.status = 'play';
			}		
			//I wish this worked. It doesn't :(
			else if (go.status === 'over'){
				go.status = 'pause';
				clearInterval(game_loop);
				var canvas = $('#mainCanvas');
				canvas.attr('width', canvas.width()); 
				canvas.attr('height', canvas.height());
  			game_loop = start();
  		}
		}
});
}

function start(){
	game = new Game();
	var game_loop;
	if(game.init()){
		// Set up game loop to display new frames at a fixed rate
		game_loop = setInterval(function(){
			// Logically separating updating and drawing
			game.update();
			game.draw();
		}, 1000 / 60);
	}
	else{
		alert('You lack a browser able to run HTML5');
	}
	return game_loop;
}


$(document).ready(function(){
	new App();
});
