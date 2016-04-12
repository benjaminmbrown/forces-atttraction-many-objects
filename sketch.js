var movers = [];
var liquid;
var noiseScale = 3;
var attractor;

function setup() {
 createCanvas(640, 360);

  for(var i=0; i<30;i++){
    movers[i] = new Mover(random(0.1,2),random(width),random(height));
  }
  attractor = new Attractor();
}

function draw() {
  background(255);


 
  attractor.display();

  for(var i = 0; i <movers.length;i++){
    var force = attractor.calculateAttraction(movers[i]);

    movers[i].applyForce(force);
    movers[i].update();
    movers[i].display();
  }

  
  }




