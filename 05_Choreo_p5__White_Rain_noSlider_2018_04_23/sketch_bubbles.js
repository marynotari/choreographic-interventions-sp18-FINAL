// let bubbles = [];
//
// let minimumSize = 1;
// let minimumSpeed = 0.1;
//
// let numBubbles = 0;
//
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//
//   for (let i = 0; i < 3000; i++) {
//     bubbles[i] = new Bubble();
//   }
// }

// function draw() {
//   background(0);
//
//   for (let i = 0; i < numBubbles; i++) {
//     bubbles[i].display();
//     bubbles[i].rise();
//   }
// }

// function keyPressed() {
//
//   // press shift to create new Bubble
//   if(keyCode === SHIFT) {
//     numBubbles += exp(2);
//   }
//
// }

class Bubble {

  constructor() {
  //Declare the local variables that define the bubbles' starting points
  this.x = random(width);
  this.y = random(height + 500, height + 10);

  // Mimic a z-axis so bubbles appear closer or farther away:
  // Declare a z variable
  // Map the z variable to size and speed to so that the smaller #s goes from shortest to longest and slowest to fastest
  this.z = random(0, 50);
  this.size =  minimumSize + this.z;
  this.speed = map(this.z, 0, 20, 0.015, 0.95);
  this.maxSpeed = this.speed;

  //Declare a gravity variable that obeys the z-axis rules above
  this.grav = map(this.z, 0, 50, 0.001, 0.05);
  }

  rise() {
  //Create the motion of the bubble
    this.y = this.y - this.speed;
  //speed decreases slightly as it rises to mimick gravity
		this.speed = minimumSpeed + this.maxSpeed * 1 * this.y/height;

    // // After the bubble hits the top, it resets to its starting point and with its starting speed
    // if (this.y < -50) {
    //   this.y = random(height + 200, height + 10);
    //   this.speed = map(this.z, 0, 20, 0.001, 0.4);
    // }

  }

  display() {
    strokeWeight(0.25);
    stroke(255);
    fill(255, 255, 255, 90);
    ellipse(this.x, this.y, this.size)
  }

}
