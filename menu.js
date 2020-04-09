function Menu() {
	this.menuDisplayed = false;
    //these determine where the menu is initially displayed on the screen, based on the illustrator design's ratios
    this.x = width*(470/1366);
    this.y = height*(111/768);
    this.w = width*(426/1366);
    this.h = height*(546/768);
    console.log(this.w);
    this.playButton = new MenuButton(this.x+(this.w*(37/426)),
                                     this.y+(this.h*(39/546)),
                                     this.w*(352/426),
                                     this.h*(64/546));
    this.restartButton = new MenuButton(this.x+(this.w*(37/426)),
                                     this.y+(this.h*(138/546)),
                                     this.w*(352/426),
                                     this.h*(64/546));
    this.fullscreenButton = new MenuButton(this.x+(this.w*(37/426)),
                                     this.y+(this.h*(450/546)),
                                     this.w*(352/426),
                                     this.h*(64/546));
    
	this.mousePressed = function() {
        
	}

	this.keyPressed = function(keycode) {
		console.log(keycode);
		if (keycode == 77) {
			this.menuDisplayed = !this.menuDisplayed;
		}

		if (keycode > 48 && keycode < 54) {
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name);
		}
	}

	this.draw = function() {
		if (this.menuDisplayed) {
            push();
            noStroke();
			fill(0, 201, 51);
            rect(this.x, this.y, this.w, this.h);
            this.playButton.draw();
            this.restartButton.draw();
            this.fullscreenButton.draw();
            pop();
		}
	}
}

function MenuButton(x_, y_, w_, h_, _name) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
    this.name = _name;
    
    this.draw = function() {
        push();
		textSize(34);
        fill(220, 0, 244);
        rect(this.x, this.y, this.w, this.h);
        textAlign(CENTER, CENTER);
        fill(0, 0, 0);
        text(this.x+(this.w/2), this.y+(this.y/2), this.name);
        pop();
    }
}

function MenuSlider() {
    
}