var w;

function setup() {
  createCanvas(600, 360);
  w = new Walker();
}

function draw() {
  background(51);
  w.update();
  w.display();
}

function Walker() {
  this.pos = createVector(width / 2, height / 2);
  this.vel = createVector(0, 0);

  this.update = function() {
    this.acc = createVector(random(-1, 1), random(-1, 1));
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  this.display = function() {
    fill(0, 255, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 48, 48);
  }
}