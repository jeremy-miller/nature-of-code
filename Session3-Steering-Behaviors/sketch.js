var flock;
var separationSlider;
var cohesionSlider;
var alignmentSlider;

function setup() {
  var canvas = createCanvas(500, 350);
  canvas.parent('canvas');

  separationSlider = createSlider(0, 5, 1, 0.1).parent('separation');
  cohesionSlider = createSlider(0, 5, 1, 0.1).parent('cohesion');
  alignmentSlider = createSlider(0, 5, 1, 0.1).parent('alignment');

  flock = new Flock();
  for (var i = 0; i < 80; i++) {
    var b = new Boid(width / 2, height / 2);
    flock.addBoid(b);
  }
}

function draw() {
  background(51);
  flock.run();
}