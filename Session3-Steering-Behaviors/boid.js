function Boid(x, y) {
  this.position = createVector(x, y);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.acceleration = createVector(0, 0);
  this.r = 3;
  this.maxSpeed = 3;
  this.maxForce = 0.05; // maximum steering force

  this.run = function(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  this.flock = function(boids) {
    var separation = this.separate(boids);
    var cohesion = this.cohere(boids);
    var alignment = this.align(boids);

    separation.mult(separationSlider.value());
    cohesion.mult(cohesionSlider.value());
    alignment.mult(alignmentSlider.value());

    this.applyForce(separation);
    this.applyForce(cohesion);
    this.applyForce(alignment);
  }

  // move away from nearby boids
  this.separate = function(boids) {
    var desiredSeparation = 25;
    var steer = createVector(0, 0);
    var count = 0;

    for (var i = 0; i < boids.length; i++) {
      var distance = p5.Vector.dist(this.position, boids[i].position);
      if ((distance > 0) && (distance < desiredSeparation)) {
        // calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(distance); // weigh by distance
        steer.add(diff);
        count++;
      }
    }

    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  // move towards nearby boids
  this.cohere = function(boids) {
    var neighborDistance = 50;
    var sum = createVector(0, 0);
    var count = 0;

    for (var i = 0; i < boids.length; i++) {
      var distance = p5.Vector.dist(this.position, boids[i].position);
      if ((distance > 0) && (distance < neighborDistance)) {
        sum.add(boids[i].position);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector(0, 0);
    }
  }
  
  this.seek = function(target) {
    var desired = p5.Vector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxSpeed);
    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  // move in the same direction as nearby boids
  this.align = function(boids) {
    var neighborDistance = 50;
    var sum = createVector(0, 0);
    var count = 0;
    
    for (var i = 0; i < boids.length; i++) {
      var distance = p5.Vector.dist(this.position, boids[i].position);
      if ((distance > 0) && (distance < neighborDistance)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      var steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  // wrap around
  this.borders = function() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  this.render = function() {
    var theta = this.velocity.heading() + PI / 2;
    fill(127);
    stroke(200);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}