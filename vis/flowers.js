function Flowers() {
    this.flowers = [];

    this.draw = function() {
        
    }
    
    this.addFlower = function() {
        var spectrum = fourier.analyze();
        var x = round(map(random(0.2, 0.9), 0.2, 0.8, width*0.2, width*0.8));
        var y = round(map(random(0.2, 0.9), 0.2, 0.8, height*0.2, height*0.8));
        this.flowers.push({x: x, y: y, colour: colour, numPetals: numPetals, petalsCol: petalsCol,
                          type: type})
    }
}
