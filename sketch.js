//globals
var mainMenu;
var visMenu;
//store visualisations in a container
var vis;
//variable for the p5 sound object
var sound;
//variable for p5 fast fourier transform
var fourier;
var origWidth;
var origHeight;
var font;

function preload() { //load sound and other things before the sketch starts so that they're ready to use once the sketch loads
	sound = loadSound('assets/stomper_reggae_bit.mp3');
    sound.playMode('restart');
    font = loadFont('assets/Helvetica.ttf');
}

function setup() { //initialise globals, instantiate objects, create canvas and set modes for functions
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    origWidth = windowWidth;
    origHeight = windowHeight;
    background(0);
    mainMenu = new MainMenu();
    visMenu = new VisMenu();

    //instantiate the fft object
    fourier = new p5.FFT();

    //create a new visualisation container and add visualisations
    vis = new Visualisations();
    vis.add(new Spectrum());
    vis.add(new WavePattern());
    vis.add(new Needles());
    vis.add(new RidgePlots());
    vis.add(new Flowers());
    vis.add(new Circle());
    textFont(font);
}

function draw() {
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
    //draw the menus
	mainMenu.draw();
    visMenu.draw();
}

function mouseClicked() { //executes once every time mouse clicked
    for (i=0; i<mainMenu.buttons.length; i++) {
        var button = mainMenu.buttons[i];
        if (button.mousePressed() == true && mainMenu.menuDisplayed == true) { //check if any menu button has been clicked
            if (button.text == "Play/Pause") {
                if (sound.isLooping() == true) {
                    sound.pause();
                } else {
                    sound.loop();
                }
            }
            if (button.text == "Restart") {
                if (sound.isLooping() == true) {
                    sound.pause(0);
                    sound.stop();
                } else {
                    sound.stop();
                }
            }
            if (button.text == "Fullscreen") {
                var ful = fullscreen();
                if (fullscreen() == false) {
                    fullscreen(0);
                } else {
                    fullscreen(1);
                }
            }
        }
    }
    for (i=0; i<visMenu.buttons.length; i++) {
        var button = visMenu.buttons[i];
        if (button.mousePressed() == true && visMenu.menuDisplayed == true) {
            vis.selectVisual(button.text);
        }
    }
    return false; //"Browsers may have different default behaviors attached to various mouse events.
                  //To prevent any default behavior for this event, add "return false" to the end of the method."
                  //from https://p5js.org/reference/#/p5/mousePressed
}

function mousePressed() { //check if mouse has been pressed (not clicked, click is press then release)
    if (mainMenu.menuDisplayed == true) {
        if (mainMenu.volumeSlider.mouseCollide() == true) {
            mainMenu.volumeSlider.isBeingPulled = true; //if slider being pulled, set it to pulled so that it pulls even when mouse is off slider
        }
        if (mainMenu.opacitySlider.mouseCollide() == true) {
            mainMenu.opacitySlider.isBeingPulled = true;
        }
    }
    return false;
}

function mouseDragged() {
    mainMenu.volumeSlider.onPull(); //check if slider is being pulled, and if it is, change the value to the slider's current position
    if (mainMenu.volumeSlider.isBeingPulled == true) {
        mainMenu.volumeSlider.changeVolume();
    }
    mainMenu.opacitySlider.onPull();
    if (mainMenu.opacitySlider.isBeingPulled == true) {
        mainMenu.opacitySlider.changeOpacity();
    }
    return false;
}

function mouseReleased() { //once released, not being pulled anymore
    mainMenu.volumeSlider.isBeingPulled = false;
    mainMenu.opacitySlider.isBeingPulled = false;
    return false;
}

function keyPressed() { //check if any keyboard keys have been pressed
	mainMenu.keyPressed(keyCode, 77); //pass which key is being pressed and the code of the key required to perform the action
    visMenu.keyPressed(keyCode, 86);
    //this part has been made redundant since menus have been completed but it wouldn't hurt to keep it here
    if (keyCode >=49 && keyCode <= 54) {
        var visNumber = keyCode - 49;
        vis.selectVisual(vis.visuals[visNumber].name); //49 to 54 are 1 to 6 respectively
    }
    return false;
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized() {
    var oldWidth = width; //dimensions of the window when the sketch first loads
    var oldHeight = height;
	resizeCanvas(windowWidth, windowHeight);
	if (vis.selectedVisual.hasOwnProperty('onResize')) { //if the current visual has an onResize method, call it
		vis.selectedVisual.onResize();
	}
    mainMenu.onResize(oldWidth, oldHeight);
    visMenu.onResize(oldWidth, oldHeight);
}
