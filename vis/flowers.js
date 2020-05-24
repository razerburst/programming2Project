function Flowers() {
    this.name = "flowers";
    this.flowers = [];
    this.numFrames = 60;
    this.index = 0;

    this.draw = function() {
        var spectrum = fourier.analyze();
        var bass = fourier.getEnergy("bass");
        var lowMid = fourier.getEnergy("lowMid");
        var highMid = fourier.getEnergy("highMid");
        var treble = fourier.getEnergy("treble");
        if (frameCount%this.numFrames == 0) { //every 10 frames generate a new batch of flowers
            this.flowers = [];
            for (var i=0; i<20; i++) {
                this.genFlower();
            }
        }
        for (var i=0; i<this.flowers.length; i++) { //draw all the stems before drawing the flowers so that they appear behind them
            var flower = this.flowers[i];
            push();
            fill(36, 173, 57);
            translate(flower.x, flower.y);
            rect(-flower.diameter/4, 0, flower.diameter/2, height*0.2);
            pop();
        }
        for (var i=0; i<this.flowers.length; i++) { //draw the flowers
            var flower = this.flowers[i];
            push();
            noStroke();
            for (var j=0; j<flower.numPetals; j++) {
                push();
                translate(flower.x, flower.y);
                //draw all the petals and rotate them one by one
                rotate((360/flower.numPetals)*j);
                fill(flower.petalsR+bass*0.65, flower.petalsG+lowMid*0.65, flower.petalsB+highMid*0.65);
                ellipse(0, flower.diameter, flower.petalsSize/2, flower.petalsSize+treble);
                pop();
            }
            //draw the middle bit of the flower
            fill(flower.innerR+bass*0.65,flower.innerG+lowMid*0.65,flower.innerB+highMid*0.65);
            circle(flower.x, flower.y, flower.diameter);
            pop();
        }
        
        if (this.index > spectrum.length) { //go through all amplitude values in the array of frequencies
            this.index = 0;
        } else {
            this.index+=1;
        }
    }
    
    this.genFlower = function() { //generate a flower object with randomised property values
        var x = round(map(random(), 0, 1, width*0.2, width*0.8));
        var y = round(map(random(), 0, 1, height*0.2, height*0.8));
        var size = random([40, 50, 60]);
        var numPetals = random([8, 9, 10, 11]);
        var innerR = random(0, 256);
        var innerG = random(0, 256);
        var innerB = random(0, 256);
        var petalsR = random(0, 200);
        var petalsG = random(0, 200);
        var petalsB = random(0, 200);
        var type = random(["rose", "daisy", "daffodil", "poppy"]); //yet to implement this
        this.flowers.push({x: x, y: y, diameter: size, innerR: innerR, innerG: innerG,
                           innerB: innerB, numPetals: numPetals, petalsR: petalsR,
                           petalsG: petalsG, petalsB: petalsB, petalsSize: size, type: type});
    }
}