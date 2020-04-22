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
    this.volumeSlider = new MenuSlider(this.x+(this.w/2),
                                 this.y+(this.h*(238/546))+(this.h*(64/546))/2,
                                 this.w*(352/426),
                                 this.h*(64/546), 
                                 "Volume", BASELINE);
    this.opacitySlider = new MenuSlider(this.x+(this.w/2),
                                 this.y+(this.h*(344/546))+(this.h*(64/546))/2,
                                 this.w*(352/426),
                                 this.h*(64/546), 
                                 "Opacity", BOTTOM);

	this.keyPressed = function(keycode) {
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
            this.volumeSlider.draw();
            this.opacitySlider.draw();
		}
	}
    
    this.onResize = function(oW, oH) {
        if (abs(oW-width) > abs(oH-height)) { //checks whether height or width got reduced more
            this.x = width*(470/1366);
            this.w = width*(426/1366);
            for (i=0; i<this.buttons.length; i++) {
                var button = this.buttons[i];
                button.x = this.x+(this.w/2);
                button.w = this.w*(352/426);
                button.textSize = 46*(width/displayWidth);
            }
        } else if (abs(oW-width) < abs(oH-height)) {
            this.y = height*(111/768);
            this.h = height*(546/768);
            this.buttons[0].y = this.y+(this.h*(39/546))+(this.h*(64/546))/2;
            this.buttons[1].y = this.y+(this.h*(138/546))+(this.h*(64/546))/2;
            this.buttons[2].y = this.y+(this.h*(450/546))+(this.h*(64/546))/2;
            for (i=0; i<this.buttons.length; i++){
                var button = this.buttons[i];
                button.h = this.h*(64/546);
                button.textSize = 46*(height/displayHeight);
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
    if (width/displayWidth <= height/displayHeight) { //if width of window too small for text then make the initial text size based on width, else the height
        this.textSize = 46*(width/displayWidth);
    } else {
        this.textSize = 46*(height/displayHeight);
    }
    
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
        this.textW = textWidth(this.text);
        this.textH = textAscent(this.text)+textDescent(this.text);
        pop();
    }
    
    this.mousePressed = function(show) {
        if (show == true){
            if (mouseX >= this.x-(this.w/2) &&
                mouseX <= this.x+(this.w/2) &&
                mouseY >= this.y-(this.h/2) && 
                mouseY <= this.y+(this.h/2)) {
                return true;
            }
        }
        return false;
    }
}

function MenuSlider(x_, y_, w_, h_, _text, textAlignY) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
    this.text = _text;
    if (width/displayWidth <= height/displayHeight) {
        this.textSize = 46*(width/displayWidth);
    } else {
        this.textSize = 46*(height/displayHeight);
    }
    this.pullerX = x_;
    this.pullerY = y_;
    this.pullerW = this.w*(318/352);
    this.pullerH = this.h*(28/64);
    this.boxW = this.w*(14/352);
    this.isPulled = false;
    
    this.draw = function() {
        push();
        textSize(this.textSize);
        fill(220, 0, 244);
        push();
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
        fill(106, 10, 255);
        rect(this.x, this.y, this.w*(318/352), this.h*(28/64));
        fill(255, 255, 255);
        rect(this.pullerX, this.pullerY, this.boxW, this.h*(28/64))
        pop();
        textAlign(CENTER, textAlignY);
        fill(0, 0, 0);
        text(this.text, this.x, this.y-(this.h/2));
        pop();
    }
    
    this.mouseCollide = function(show) {
        if (show == true){
            if (mouseX >= this.x-(this.pullerW/2) &&
                mouseX <= this.x+(this.pullerW/2) &&
                mouseY >= this.y-(this.pullerH/2) && 
                mouseY <= this.y+(this.pullerH/2)) {
                return true;
            }
        }
    }
    
    this.onPull = function(show) {
        if (show == true) {
            if (this.isPulled == true) {
                this.pullerX = mouseX;
                if (this.pullerX+(this.boxW/2) >= this.x+(this.pullerW/2)) {
                    this.pullerX = this.x+(this.pullerW/2)-(this.boxW/2);
                } else if (this.pullerX-(this.boxW/2) <= this.x-(this.pullerW/2)) {
                    this.pullerX = this.x-(this.pullerW/2)+(this.boxW/2);
                }
            }
        }
    }
}