var particles = [];
var attractor;

function setup() {
  createCanvas(475, 360);
  attractor = new Attractor();

  for (var i = 0; i < 10; i++) {
    var particle = new Particle(random(0, width), random(0, height), random(1, 4));
    particles.push(particle);
  }
}

function draw() {
  background(75);

  attractor.display();

  var wind = createVector(random(-0.5, 0.5), random(-0.5, 0.5));

  for (var i = 0; i < particles.length; i++) {
    var force = attractor.calculateAttraction(particles[i]);
    particles[i].applyForce(force);
    particles[i].applyForce(wind);
    particles[i].update();
    particles[i].display(i);
  }
}