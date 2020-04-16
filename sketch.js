//global for the controls and input 
var mainMenu;
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
    font = loadFont('assets/Helvetica.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    origWidth = windowWidth;
    origHeight = windowHeight;
    background(0);
    mainMenu = new Menu();

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
        mainMenu.buttons[i].mousePressed(mainMenu.menuDisplayed);
    }
}

function mouseDragged() {
    mainMenu.volumeSlider.onPull();
    mainMenu.opacitySlider.onPull();
    return false;
}

function keyPressed() {
	mainMenu.keyPressed(keyCode);
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
