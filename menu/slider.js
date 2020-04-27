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