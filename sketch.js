//global for the controls and input
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

function preload() {
	sound = loadSound('assets/stomper_reggae_bit.mp3');
    sound.playMode('restart');
    font = loadFont('assets/Helvetica.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
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
    textFont(font);
}

function draw() {
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	mainMenu.draw();
}

function mouseClicked() {
    for (i=0; i<mainMenu.buttons.length; i++) {
        var button = mainMenu.buttons[i];
        if (button.mousePressed() == true && mainMenu.menuDisplayed == true) {
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
    return false; //"Browsers may have different default behaviors attached to various mouse events.
                  //To prevent any default behavior for this event, add "return false" to the end of the method."
                  //from https://p5js.org/reference/#/p5/mousePressed
}

function mousePressed() {
    if (mainMenu.menuDisplayed == true) {
        if (mainMenu.volumeSlider.mouseCollide() == true) {
            mainMenu.volumeSlider.isBeingPulled = true;
        }
        if (mainMenu.opacitySlider.mouseCollide() == true) {
            mainMenu.opacitySlider.isBeingPulled = true;
        }
    }
    return false;
}

function mouseDragged() {
    mainMenu.volumeSlider.onPull();
    if (mainMenu.volumeSlider.isBeingPulled == true) {
        mainMenu.volumeSlider.changeVolume();
    }
    mainMenu.opacitySlider.onPull();
    return false;
}

function mouseReleased() {
    mainMenu.volumeSlider.isBeingPulled = false;
    mainMenu.opacitySlider.isBeingPulled = false;
    return false;
}

function keyPressed() {
	mainMenu.keyPressed(keyCode, 77); //pass which key is being pressed and the code of the key required to perform the action
    visMenu.keyPressed(keyCode, 86);
    if (keyCode >=49 && keyCode <= 53) {
        var visNumber = keyCode - 49;
        vis.selectVisual(vis.visuals[visNumber].name); //49 to 53 are 0 to 4 respectively
    }
    return false;
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized() {
    var oldWidth = width;
    var oldHeight = height;
	resizeCanvas(windowWidth, windowHeight);
	if (vis.selectedVisual.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}
    mainMenu.onResize(oldWidth, oldHeight);
}
