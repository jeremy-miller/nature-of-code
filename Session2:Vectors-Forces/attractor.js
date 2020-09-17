var Attractor = function() {
  this.pos = createVector(width / 2, height / 2);
  this.mass = 10;
  this.G = 1;

  this.calculateAttraction = function(particle) {
    // calculate direction of force
    var force = p5.Vector.sub(this.pos, particle.pos);

    // distance between objects
    var distance = force.mag();

    // ensure distance is always a reasonable value
    distance = constrain(distance, 5, 10);

    // just get the direction of the force, magnitude will be added below
    force.normalize();

    // calculate gravitional force magnitude
    var strength = (this.G * this.mass * particle.mass) / (distance ^ 2);

    // get force vector (magnitude * direction)
    force.mult(strength);

    return force;
  }

  this.display = function() {
    ellipseMode(CENTER);
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.mass * 5, this.mass * 5);
  }
}