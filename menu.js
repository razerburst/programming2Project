function Menu() {
	this.menuDisplayed = false;
    //these determine where the menu is initially displayed on the screen, based on the illustrator design's ratios
    this.x = width*(470/1366); //x position of menu roughly equates to 34% of the given window width
    this.y = height*(111/768); //y position of menu roughly equates to 15% of the given window height
    this.w = width*(426/1366);
    this.h = height*(546/768);
    this.buttons = []; //array to store button objects
    this.buttons.push(new MenuButton(this.x+(this.w/2), //x pos of menu + half width of button to centre it
                                     this.y+(this.h*(39/546))+(this.h*(64/546))/2, //y pos of menu + height from top of menu to top of button
                                     this.w*(352/426),                             //+ half the height of button itself to centre it
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
                                 this.y+(this.h*(238/546))+(this.h*(64/546))/2, //y pos of menu + height from top of menu to top of slider
                                 this.w*(352/426),                              //+ half the height of slider itself
                                 this.h*(64/546), 
                                 "Volume", BASELINE);
    this.opacitySlider = new MenuSlider(this.x+(this.w/2),
                                 this.y+(this.h*(344/546))+(this.h*(64/546))/2,
                                 this.w*(352/426),
                                 this.h*(64/546), 
                                 "Opacity", BOTTOM);

	this.keyPressed = function(keycode, key) {
		if (keycode == key) {
			this.menuDisplayed = !this.menuDisplayed;
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
            this.x = width*(470/1366); //original menu x position and width but now based on how far across the window relative to the original width it is
            this.w = width*(426/1366);
            for (i=0; i<this.buttons.length; i++) { //button x positions after resizing width are equal to the new menu's x plus half the menu's width
                var button = this.buttons[i];
                button.x = this.x+(this.w/2);
                button.w = this.w*(352/426);
                button.textSize = 46*(width/displayWidth); //text size is the original text size (46) multiplied by the ratio of window to display width
            }                                              //i.e. text size is max (46) when window width is equal to display width and smaller if window width is smaller
            this.volumeSlider.init(this.x+(this.w/2), this.volumeSlider.y, this.w*(352/426), this.volumeSlider.h); //reinitialising volume slider size and position
            this.opacitySlider.init(this.x+(this.w/2), this.opacitySlider.y, this.w*(352/426), this.volumeSlider.h); //same y and height but different x and width
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
            this.volumeSlider.init(this.volumeSlider.x, this.y+(this.h*(238/546))+(this.h*(64/546))/2,
                                   this.volumeSlider.w, this.h*(64/546)); //reinitialising volume slider size and position, same y and height but different x and width
            this.opacitySlider.init(this.opacitySlider.x, this.y+(this.h*(344/546))+(this.h*(64/546))/2,
                                   this.opacitySlider.w, this.h*(64/546));
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
        this.textSize = 46*(width/displayWidth);      //so that text can always be read, even if height is adjusted and width is not and vice versa
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
    
    this.mousePressed = function() {
        if (mouseX >= this.x-(this.w/2) &&
            mouseX <= this.x+(this.w/2) &&
            mouseY >= this.y-(this.h/2) && 
            mouseY <= this.y+(this.h/2)) {
            return true;
        }
    }
}

function MenuSlider(x_, y_, w_, h_, _text, textAlignY) { //textAlignY necessary to position text according to whether the descent of the characters go below the baseline
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
    this.sliderX = this.x+(this.w*(318/352)/2);
    this.sliderY = y_;
    this.sliderW = this.w*(318/352);
    this.sliderH = this.h*(28/64);
    this.sliderStart = this.x-(this.sliderW/2)+(this.w*(14/352)/2);
    this.sliderEnd = this.x+(this.sliderW/2)-(this.w*(14/352)/2);

    this.pullerX = this.sliderEnd;
    this.pullerY = y_;
    this.pullerW = this.w*(14/352);
    this.pullerH = this.h*(28/64);
    this.isBeingPulled = false;
    this.value = 1; //start with slider at max
    
    this.init = function(x_, y_, w_, h_) {
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
        this.sliderX = this.x+(this.w*(318/352)/2);
        this.sliderY = y_;
        this.sliderW = this.w*(318/352);
        this.sliderH = this.h*(28/64);
        this.sliderStart = this.x-(this.sliderW/2)+(this.w*(14/352)/2);
        this.sliderEnd = this.x+(this.sliderW/2)-(this.w*(14/352)/2);
        
        this.pullerX = map(this.value, 0, 1, this.sliderStart, this.sliderEnd);
        this.pullerY = y_;
        this.pullerW = this.w*(14/352);
        this.pullerH = this.h*(28/64);
        this.isBeingPulled = false;
    }
    
    this.draw = function() {
        push();
        textSize(this.textSize);
        fill(220, 0, 244);
        push();
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h); //outer box (same size and colour as menu buttons)
        fill(106, 10, 255); 
        rect(this.x, this.y, this.w*(318/352), this.h*(28/64)); //inner box (the blue part where the puller moves)
        fill(255, 255, 255); //puller is white
        rect(this.pullerX, this.pullerY, this.pullerW, this.pullerH); //puller 
        pop();
        textAlign(CENTER, textAlignY);
        fill(0, 0, 0);
        text(this.text, this.x, this.y-(this.h/2));
        pop();
    }
    
    this.mouseCollide = function() {
        if (mouseX >= this.x-(this.sliderW/2) &&
            mouseX <= this.x+(this.sliderW/2) &&
            mouseY >= this.y-(this.sliderH/2) && 
            mouseY <= this.y+(this.sliderH/2)) {
            return true;
        }
    }
    
    this.onPull = function() {
        if (this.isBeingPulled == true) {
            this.pullerX = mouseX;
            if (this.pullerX+(this.pullerW/2) >= this.x+(this.sliderW/2)) {
                this.pullerX = this.sliderEnd;
            } else if (this.pullerX-(this.pullerW/2) <= this.x-(this.sliderW/2)) {
                this.pullerX = this.sliderStart;
            }
        }
        this.value = map(this.pullerX, this.sliderStart, this.sliderEnd, 0, 1);
    }
    
    this.changeVolume = function() {
        sound.setVolume(this.value);
    }
    
    this.changeOpacity = function() {
        //change opacity of menus, visualisations, etc
    }
}