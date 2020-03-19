//declare globals
var music;
var lines;
var startX;
var startY;
var endY;
var plotWidth;
var plotHeight;
var numFrames;
var speed;
var fourier;

function preload(){
    music = loadSound('assets/stomper_reggae_bit.mp3');
}

function setup() //initialises global variables
{
	createCanvas(800, 600);
    lines = []; //array to hold line arrays
    numFrames = 10; //draw lines to plot every x frames
    //below are variables to do with the position and size of the plot
    startX = width/5;
    endY = height/5;
    startY = height-endY;
    plotWidth = (width/5)*3;
    plotHeight = (height/5)*3;
    speed = 0.7;
    fourier = new p5.FFT();
}


function draw()
{
    //"clear" the screen once every draw() call by essentially filling the screen with the background colour
    background(0);
    //used to see what the plot would look like
//    fill(255);
//    rect(startX, endY, plotWidth, plotHeight);
    fill(0);
    stroke(255);
    strokeWeight(2);
    if (frameCount%numFrames == 0){
        addWave();
    }
    
    for (var i=0; i<lines.length; i++){ //first loop iterates through the array of line arrays
        var l = lines[i];
        beginShape();
        for(var j=0; j<l.length; j++){ //second loop iterates through each line array and decreases their y properties by some amount
            l[j].y-=speed;
            vertex(l[j].x, l[j].y)
        }
        endShape();
        if (l[0].y < endY){
            lines.splice(i, 1);
        }
    }
}

function mousePressed(){
    music.loop();
}

function addWave(){ //factory method that generates line arrays and pushes them to the output "lines" array
//    lines.push([{x: startX, y: startY}, {x: startX+plotWidth, y: startY}]);
    var wave = fourier.waveform();
    var outputWave = [];
    var smallScale = 3;
    var bigScale = 40;
    
    for (var i=0; i<wave.length; i++){
        if (i%20 == 0){
            var x = map(i, 0, 1024, startX, startX+plotWidth);
            if (i < 1024*0.25 || i > 1024*0.75){
                var y = map(wave[i], -1, 1, -smallScale, smallScale);
                outputWave.push({x: x, y: startY + y});
            } else{
                var y = map(wave[i], -1, 1, -bigScale, bigScale);
                outputWave.push({x: x, y: startY + y});
            }
        }
    }
    lines.push(outputWave);
}