function RidgePlots() {
    this.lines = [] //array to hold line arrays
    //below are variables to do with the position and size of the plot
    this.startX = width/5
    this.endY = height/5;
    this.startY = height-this.endY;
    this.plotWidth = (width/5)*3;
    this.plotHeight = (height/5)*3;
    this.numFrames = 6; //draw lines to plot every x frames
    this.speed = 2;
    this.play = true;
    this.a = 0;
    this.hue = 0;

    this.draw = function () {
        this.a += PI/180;
        var hue = map(sin(this.a), -1, 1, 0, 180);
        if (frameCount%this.numFrames == 0) { //every 10 frames add a line to the array
            this.addWave();
        }
        for (var i=0; i<this.lines.length; i++) { //first loop iterates through the array of line arrays
            var l = this.lines[i];
            push();
            colorMode(HSB, max=180);
            strokeWeight(4);
            stroke(hue+i-(this.lines.length/2), 100, 100);
            noFill();
            beginShape();
            for(var j=0; j<l.length; j++) { //second loop iterates through each line array and decreases their y properties by speed
                l[j].y-=this.speed;
                curveVertex(l[j].x, l[j].y)
            }
            endShape();
            pop();
            if (l[0].y < this.endY) { //if the line goes past the top of the plot, remove it from the list
                this.lines.splice(i, 1);
            }
        }
    }
    
    this.addWave = function() { //method that generates line arrays and pushes them to the output "lines" array
        var wave = fourier.waveform();
        var outputWave = [];

        for (var i=0; i<wave.length; i++) {
            var angle = map(i, 0, wave.length, 0, PI);
            if (i%50 == 0) { //every 40 bins so that the wave isn't jagged
                var x = map(i, 0, wave.length, this.startX, this.startX+this.plotWidth);
                var y = map(wave[i], -1, 1, -3*sin(angle), 3*sin(angle));
                outputWave.push({x: x, y: this.startY + y*50});
            }
        }
        this.lines.push(outputWave);
    }
}
