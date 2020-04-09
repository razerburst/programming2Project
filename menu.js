//Constructor function to handle the onscreen menu
function Menu() {
	this.menuDisplayed = false;
	this.mousePressed = function() {
        
	}

	this.keyPressed = function(keycode) {
		console.log(keycode);
		if (keycode == 32) {
			this.menuDisplayed = !this.menuDisplayed;
		}

		if (keycode > 48 && keycode < 58) {
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name);
		}
	}

	this.draw = function() {
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);
		if (this.menuDisplayed) {
			fill(0, 201, 51);
            rect(width*0.34, height*0.15, width*0.31, height*0.71)
		}
		pop();

	}
}

function MenuButtons() {
    
}