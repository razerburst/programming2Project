//declare globals
var music;
var lines;
var startX;
var startY;
var endY;
var plotWidth;
var plotHeight;
var numFrames;
var speed = 0.7
var fourier;
var play = true;

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
    if (frameCount%numFrames == 0){ //every 10 frames add a line to the array
        addWave();
    }
    
    for (var i=0; i<lines.length; i++){ //first loop iterates through the array of line arrays
        var l = lines[i];
        beginShape();
        for(var j=0; j<l.length; j++){ //second loop iterates through each line array and decreases their y properties by some amount
            l[j].y-=speed;
            curveVertex(l[j].x, l[j].y)
        }
        endShape();
        if (l[0].y < endY){ //if the line goes past the top of the plot, remove it from the list
            lines.splice(i, 1);
        }
    }
}

function mousePressed(){
    if (play){
        music.loop();
    } else{
        music.stop();
    }
    play = !play;
}

function addWave(){ //factory method that generates line arrays and pushes them to the output "lines" array
//    lines.push([{x: startX, y: startY}, {x: startX+plotWidth, y: startY}]);
    var wave = fourier.waveform();
    var outputWave = [];
    
    for (var i=0; i<wave.length; i++){
        if (i%40 == 0){ //
            var x = map(i, 0, 1024, startX, startX+plotWidth);
            if (i < 1024*0.5){ //if left half of waveform, increase scale
                var gradInc = (i/40)*(40/12.8); //gradually increase the scale up to 40
                var y = map(wave[i], -1, 1, -gradInc, gradInc);
                outputWave.push({x: x, y: startY + y});
            } else{ //otherwise decrease scale
                var gradDec = ((512/40)-((i-512)/40))*(40/12.8); //gradually decrease the scale down to 2
                var y = map(wave[i], -1, 1, -gradDec, gradDec);
                outputWave.push({x: x, y: startY + y});
            }
        }
    }
    lines.push(outputWave);
}