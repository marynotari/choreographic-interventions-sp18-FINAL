//NOTE: I attempted to create a separate file within project-folder for function rainDrop().
//			It isn't working currently.

// global variables
let drops = [];
// let sliderRain;
let numDrop = 0;
// let wind;
let vid;
let img;
let keyVariable = false;


function setup() {
  // create image background
  // img = loadImage("placeholder.png");

  // create video background
  vid = createVideo("contour_large.mp4");
  vid.hide(); //vid shows up as separate DOM element next to the canvas, so hide it and then redraw below

  createCanvas(1920, 1200);

  // // create slider to control number of raindrops
  // sliderRain = createSlider(0, 2000, 0);
  // sliderRain.position(10, 10);
  // sliderRain.size(width-20);

  // create a new raindrop for each loop
  // push the raindrop to the empty array defined above
  // max # of raindrops defined as 2000
  for (let i = 0; i < 3000; i++) {
    drops[i] = new rainDrop();
  }
}

function draw() {
  background(255);
  // background(img);
  // background(vid);

  image(vid, 0, 0);

  //make slider human controled somehow
  for (i = 0; i < numDrop; i++) {
    drops[i].show();
    drops[i].move();
    drops[i].reset();
    // press left arrow to activate dripping rain
    drops[i].resize();
  }

}

function keyPressed() {

  if(keyCode === RIGHT_ARROW) {
    numDrop += exp(2);
  }

  if(keyCode === RETURN) {
    vid.pause();
    console.log("paused");
  }

}

function mousePressed() {
  vid.play();
}

class rainDrop {

  //Declare the local variables that define the raindrops' starting points
  constructor() {
    this.x = random(width);
    this.y = random(-500, -10);
    this.z = random(0, 20);
    this.size = map(this.z, 0, 20, 5, 20);
    this.speed = map(this.z, 0, 20, 3, 10);

    this.length = this.y + this. size;

    //Declare a variable for the wind--see applyForce() below
    this.blow = createVector();

    //Declare a gravity variable that obeys the z-axis rules above
    this.grav = map(this.z, 0, 20, 0.025, 0.4);

  }

  // Mimic a z-axis so drops appear closer or farther away:
  // Declare a z variable
  // Map the z variable to size and speed to so that the smaller #s goes from shortest to longest and slowest to fastest
  show() {
    //Draw the raindrop
    stroke(0);
    strokeWeight(map(this.z, 0.1, 20, 1, 5));
    line(this.x, this.y, this.x, this.y + this.size);
  }

  //Create the motion of the raindrop
  move() {
    this.y = this.y + this.speed;
    this.speed = this.speed + this.grav //speed increases slightly as it falls to mimick gravity
  }

  reset() {
    // After the raindrop hits the bottom, it resets to its starting point and with its starting speed
    if(keyVariable === false) {
      if (this.y > height) {
        this.y = random(-200, -10);
        this.speed = map(this.z, 0, 20, 4, 10);
      }
    }
  }

// press left arrow and the raindrops will slowly drip down the screen
  resize() {
    if(keyCode === LEFT_ARROW){
      keyVariable = true;
      this.speed = map(this.z, 0, 20, 3, 7.5)
      line(this.x, this.y, this.x, this.length);
    }
  }
}
