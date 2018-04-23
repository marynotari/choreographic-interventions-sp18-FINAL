// global variables
let drops = [];
let numDrop = 0;
let vid;
let img;
let keyVariable = false;

// global bubbles variables
let bubbles = [];
let minimumSize = 1;
let minimumSpeed = 0.1;
let numBubbles = 0;

function setup() {

  // create video background
  vid = createVideo("dance2.mp4");
  vid.hide(); //vid shows up as separate DOM element next to the canvas, so hide it and then redraw below

  createCanvas(1920, 1200);

  // create a new raindrop for each loop
  // push the raindrop to the empty array defined above
  // max # of raindrops defined as 3000
  for (let i = 0; i < 3000; i++) {
    drops[i] = new rainDrop();
  }

  for (let z = 0; z < 3000; z++) {
    bubbles[z] = new Bubble();
  }

}

function draw() {
  background(0);

  // draw the video as an image on the canvas
  image(vid, 0, 0);

  // draw each instance of the rainDrop
  for (i = 0; i < numDrop; i++) {
    drops[i].show();
    drops[i].move();
    drops[i].reset();
    // press left arrow to activate dripping rain
    drops[i].resize();
  }

// draw each instance of Bubble
  for (let i = 0; i < numBubbles; i++) {
    bubbles[i].display();
    bubbles[i].rise();
  }

  // erase the last bubble created when the bubbles hit the top
  // for (let i = bubbles.length - 1; i >= 0; i--) {
  //   if (bubbles[i].y < -25) {
  //       bubbles.splice(i, 1);
  //   }
  // }

}

function keyPressed() {

  // press right arrow to create new drops
  if(keyCode === RIGHT_ARROW) {
    numDrop += exp(2);
  }

  // press return to pause video
  if(keyCode === RETURN) {
    vid.pause();
    console.log("paused");
  }

  // press shift to create new Bubble
  if(keyCode === SHIFT) {
    numBubbles += exp(2);
  }

  if(keyCode === CONTROL) {
    // for (let i = bubbles.length; i >= 0; i--) {
      // if (bubbles[i].y < -25) {
          bubbles.pop();
      // }
    // }
  }

}

// click the mouse to play the video
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
    stroke(255);
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
