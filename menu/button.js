function MenuButton(x_, y_, w_, h_, _text) {
    //position and size variables
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
    this.text = _text;
    this.a = 255; //opacity
    if (width/displayWidth <= height/displayHeight) { //if width of window too small for text then make the initial text size based on width, else the height
        this.textSize = 46*(width/displayWidth);      //so that text can always be read, even if height is adjusted and width is not and vice versa
    } else {
        this.textSize = 46*(height/displayHeight);
    }
    
    this.draw = function() { //render menu button
        push();
        textSize(this.textSize);
        fill(220, 0, 244, this.a);
        push();
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
        pop();
        textAlign(CENTER, CENTER);
        fill(0, 0, 0, this.a);
        text(this.text, this.x, this.y);
        pop();
    }
    
    this.mousePressed = function() { //detect collision with mouse
        if (mouseX >= this.x-(this.w/2) &&
            mouseX <= this.x+(this.w/2) &&
            mouseY >= this.y-(this.h/2) && 
            mouseY <= this.y+(this.h/2)) {
            return true;
        }
    }
}