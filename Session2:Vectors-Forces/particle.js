function Particle(x, y, mass) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = mass;

  this.applyForce = function(force) {
    var forceCopy = force.copy(); // copy so we don't modify the original
    forceCopy.div(this.mass)
    this.acc.add(forceCopy);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // reset accelaration
    this.acc.set(0, 0);
  }

  this.display = function(index) {
    switch (index % 3) {
      case 0:
        fill(255, 0, 0);
        break;
      case 1:
        fill(0, 255, 0);
        break;
      case 2:
        fill(0, 0, 255);
        break;
    }
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.mass * 5, this.mass * 5);
  }
}