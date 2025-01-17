function MenuSlider(x_, y_, w_, h_, _text, textAlignY) { //textAlignY necessary to position text according to whether the descent of the characters go below the baseline
    //position and size variables
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
    //alpha value
    this.a = 255;
    this.text = _text;
    //make text size match window dimensions on slider creation
    if (width/displayWidth <= height/displayHeight) {
        this.textSize = 46*(width/displayWidth);
    } else {
        this.textSize = 46*(height/displayHeight);
    }
    //position and size variables for slider box
    this.sliderX = this.x+(this.w*(318/352)/2);
    this.sliderY = y_;
    this.sliderW = this.w*(318/352);
    this.sliderH = this.h*(28/64);
    this.sliderStart = this.x-(this.sliderW/2)+(this.w*(14/352)/2);
    this.sliderEnd = this.x+(this.sliderW/2)-(this.w*(14/352)/2);
    //position and size variables for puller
    this.pullerX = this.sliderEnd;
    this.pullerY = y_;
    this.pullerW = this.w*(14/352);
    this.pullerH = this.h*(28/64);
    this.isBeingPulled = false;
    this.value = 1; //start with slider at max
    
    this.init = function(x_, y_, w_, h_) { //method to reinitialise size and position of object (for resizing)
        this.x = x_;
        this.y = y_;
        this.w = w_;
        this.h = h_;
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
    
    this.draw = function() { //render slider to the screen
        push();
        textSize(this.textSize);
        fill(220, 0, 244, this.a);
        push();
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h); //outer box (same size and colour as menu buttons)
        fill(106, 10, 255, this.a); 
        rect(this.x, this.y, this.w*(318/352), this.h*(28/64)); //inner box (the blue part where the puller moves)
        fill(255, 255, 255, this.a); //puller is white
        rect(this.pullerX, this.pullerY, this.pullerW, this.pullerH); //puller 
        pop();
        textAlign(CENTER, textAlignY);
        fill(0, 0, 0, this.a);
        text(this.text, this.x, this.y-(this.h/2));
        pop();
    }
    
    this.mouseCollide = function() { //returns true if mouse is within slider
        if (mouseX >= this.x-(this.sliderW/2) &&
            mouseX <= this.x+(this.sliderW/2) &&
            mouseY >= this.y-(this.sliderH/2) && 
            mouseY <= this.y+(this.sliderH/2)) {
            return true;
        }
    }
    
    this.onPull = function() {
        if (this.isBeingPulled == true) {
            this.pullerX = mouseX; //moves the puller to where the mouse is
            if (this.pullerX+(this.pullerW/2) >= this.x+(this.sliderW/2)) { //if puller is touching either end of the slider, adjust its position so it's within slider
                this.pullerX = this.sliderEnd;
            } else if (this.pullerX-(this.pullerW/2) <= this.x-(this.sliderW/2)) {
                this.pullerX = this.sliderStart;
            }
        }
        this.value = map(this.pullerX, this.sliderStart, this.sliderEnd, 0, 1); //change value of slider to position of puller
    }
    
    this.changeVolume = function() { //set music volume to slider value
        sound.setVolume(this.value);
    }
    
    this.changeOpacity = function() { //set menu opacities to slider value
        var alpha = map(this.value, 0, 1, 30, 255);
        mainMenu.a = alpha;
        visMenu.a = alpha;
    }
}