//global for the controls and input 
var menu;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

function preload() {
	sound = loadSound('assets/stomper_reggae_bit.mp3');
}

function setup() {
	 createCanvas(windowWidth, windowHeight);
	 background(0);
	 menu = new Menu();

	 //instantiate the fft object
	 fourier = new p5.FFT();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
}

function draw() {
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	menu.draw();
}

function mouseClicked() {
	menu.mousePressed();
}

function keyPressed() {
	menu.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (vis.selectedVisual.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}
}
