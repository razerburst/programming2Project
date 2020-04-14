function Menu() {
	this.menuDisplayed = false;
    //these determine where the menu is initially displayed on the screen, based on the illustrator design's ratios
    this.x = width*(470/1366);
    this.y = height*(111/768);
    this.w = width*(426/1366);
    this.h = height*(546/768);
    this.buttons = []; //array to store button objects
    this.buttons.push(new MenuButton(this.x+(this.w/2),
                                     this.y+(this.h*(39/546))+(this.h*(64/546))/2,
                                     this.w*(352/426),
                                     this.h*(64/546), 
                                     "Play/Pause"));
    this.buttons.push(new MenuButton(this.x+(this.w/2),
                                     this.y+(this.h*(138/546))+(this.h*(64/546))/2,
                                     this.w*(352/426),
                                     this.h*(64/546), 
                                     "Restart"));
    this.buttons.push(new MenuButton(this.x+(this.w/2),
                                     this.y+(this.h*(450/546))+(this.h*(64/546))/2,
                                     this.w*(352/426),
                                     this.h*(64/546), 
                                     "Fullscreen"));
    
	this.mousePressed = function() {
        
	}

	this.keyPressed = function(keycode) {
		console.log(keycode);
		if (keycode == 77) {
			this.menuDisplayed = !this.menuDisplayed;
		}
		if (keycode > 47 && keycode < 53) { //48 to 52 are 0 to 4 respectively
			var visNumber = keycode - 48;
			vis.selectVisual(vis.visuals[visNumber].name);
		}
	}

	this.draw = function() { //render the menu GUI and the buttons
		if (this.menuDisplayed) {
            push();
            noStroke();
			fill(0, 201, 51);
            rect(this.x, this.y, this.w, this.h);
            for (i=0; i<this.buttons.length; i++) {
                this.buttons[i].draw();
            }
            pop();
		}
	}
    
    this.onResize = function(oW, oH) {
        if (abs(oW-width) > abs(oH-height)) { //checks whether height or width got reduced more
            this.x = width*(470/1366);
            this.w = width*(426/1366);
            for (i=0; i<this.buttons.length; i++) {
                this.buttons[i].x = this.x+(this.w/2);
                this.buttons[i].w = this.w*(352/426);
            }
        } else if (abs(oW-width) < abs(oH-height)) {
            this.y = height*(111/768);
            this.h = height*(546/768);
            this.buttons[0].y = this.y+(this.h*(39/546))+(this.h*(64/546))/2;
            this.buttons[1].y = this.y+(this.h*(138/546))+(this.h*(64/546))/2;
            this.buttons[2].y = this.y+(this.h*(450/546))+(this.h*(64/546))/2;
            for (i=0; i<this.buttons.length; i++){
                this.buttons[i].w = this.w*(352/426);
                this.buttons[i].h = this.h*(64/546);
            }
        }
    }
}

function MenuButton(x_, y_, w_, h_, _text) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
    this.text = _text;
    this.textSize = 46;
    
    this.draw = function() {
        push();
        textSize(this.textSize);
        fill(220, 0, 244);
        push();
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
        pop();
        textAlign(CENTER, CENTER);
        fill(0, 0, 0);
        text(this.text, this.x, this.y);
        pop();
    }
}

function MenuSlider() {
    
}