function VisMenu() {
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
                                     "Extension"));
    this.buttons.push(new MenuButton(this.x+(this.w/2),
                                     this.y+(this.h*(141/546))+(this.h*(64/546))/2,
                                     this.w*(352/426),
                                     this.h*(64/546), 
                                     "Flowers"));
    this.buttons.push(new MenuButton(this.x+(this.w/2),
                                     this.y+(this.h*(244/546))+(this.h*(64/546))/2,
                                     this.w*(352/426),
                                     this.h*(64/546), 
                                     "Vis 3"));
    this.buttons.push(new MenuButton(this.x+(this.w/2),
                                     this.y+(this.h*(347/546))+(this.h*(64/546))/2,
                                     this.w*(352/426),
                                     this.h*(64/546), 
                                     "Vis 4"));
    this.buttons.push(new MenuButton(this.x+(this.w/2),
                                     this.y+(this.h*(450/546))+(this.h*(64/546))/2,
                                     this.w*(352/426),
                                     this.h*(64/546), 
                                     "Vis 5"));

	this.keyPressed = function(keycode, key) {
		if (keycode == key) {
			this.menuDisplayed = !this.menuDisplayed;
        }
	}

	this.draw = function() { //render the menu GUI and the buttons
		if (this.menuDisplayed) {
            push();
            noStroke();
			fill(106, 10, 255);
            rect(this.x, this.y, this.w, this.h);
            for (i=0; i<this.buttons.length; i++) {
                this.buttons[i].draw();
            }
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
        } else if (abs(oW-width) < abs(oH-height)) {
            this.y = height*(111/768);
            this.h = height*(546/768);
            this.buttons[0].y = this.y+(this.h*(39/546))+(this.h*(64/546))/2;
            this.buttons[1].y = this.y+(this.h*(141/546))+(this.h*(64/546))/2;
            this.buttons[2].y = this.y+(this.h*(244/546))+(this.h*(64/546))/2;
            this.buttons[3].y = this.y+(this.h*(347/546))+(this.h*(64/546))/2;
            this.buttons[4].y = this.y+(this.h*(450/546))+(this.h*(64/546))/2;
            for (i=0; i<this.buttons.length; i++){
                var button = this.buttons[i];
                button.h = this.h*(64/546);
                button.textSize = 46*(height/displayHeight);
            }
        }
    }
}