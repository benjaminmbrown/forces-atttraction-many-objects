var Attractor = function(){
this.mass = 20;
this.position = createVector(width/2, height/2);
this.G = 0.4;
this.dragOffset = createVector(0,0);
this.dragging = false;
this.rollover = false;


//calculates attraction of an entity to this attractor
this.calculateAttraction = function(entity){
	console.log(this);
	console.log(entity);
	var force = p5.Vector.sub(this.position, entity.position); //force directions
	var distance = force.mag();//distance between objects
	distance = constrain(distance,5,25);//eliminates extreme results
	force.normalize();//dormalize the fector we only need vector no mag
	var strength = (this.G * this.mass * entity.mass)/(distance *distance);//variable attractive strength
	force.mult(strength);//force vector --> magnitude * directions
	return force;
}

//this allows us to send an object with position and we can say whether
//or not it is inside the liquid's bounds
this.contains = function(entity){
	var l = entity.position;
	//returns true if object is inside liquid
	return l.x > this.x && l.x < this.x + this.w &&
           l.y > this.y && l.y < this.y + this.h;

}

 // Method to display
  this.display = function() {
    ellipseMode(CENTER);
    strokeWeight(4);
    stroke(0);
    if (this.dragging) {
      fill(50);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(175, 200);
    }
    ellipse(this.position.x, this.position.y, this.mass*2, this.mass*2);
  };

    // The methods below are for mouse interaction
  this.handlePress = function(mx, my) {
    var d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
  };

  this.handleHover = function(mx, my) {
    var d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  };

  this.stopDragging = function() {
    this.dragging = false;
  };

  this.handleDrag = function(mx, my) {
    if (this.dragging) {
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  };

}