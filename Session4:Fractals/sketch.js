var angle;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(51);
  
  angle = map(mouseX, 0, width, 0, PI / 2);
  
  translate(width / 2, height);  // start tree at bottom of screen
  stroke(255);
  branch(120, 1);
}

function branch(length, generation) {
  strokeWeight(map(generation, 1, 10, 4, 1));
  // Use (0,0) as start since we translated above
  // Use -length since x/y increase from top-left corner
  line(0, 0, 0, -length);
  
  // move to the end of the drawn line
  translate(0, -length);
  length *= 0.66;  // shrink next line length
  
  generation++;
  
  if (length > 2) {
    push();
    rotate(angle);
    branch(length, generation);
    pop();
    
    push();
    rotate(-angle);
    branch(length, generation);
    pop();
  }
}