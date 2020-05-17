function Circle() {
    
    this.name = "circle";
    
    
    	this.draw = function() {
		push();
		noFill();
		stroke(194, 3, 252);
		strokeWeight(2);
         
        //position the circle in the center
            
        translate(width/2, height/2);    
		beginShape();
		//calculate the waveform from the fft.
		var wave = fourier.waveform();
		for (var i = 0; i < 360; i++) {
			//create cricle shape using the angle
            var r = map(wave[i], -1, 1, 0, height);
			var x = r * cos(i);
			var y = r * sin(i);

			vertex(x, y);
		}

		endShape();
		pop();
	};
}