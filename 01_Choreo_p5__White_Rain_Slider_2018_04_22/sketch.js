//NOTE: I attempted to create a separate file within project-folder for function rainDrop().

let drops = [];
let sliderRain;
let wind;
let vid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  vid = createVideo("http://www.marynotari.com/wp-content/uploads/2018/04/Fog_01.mp4");
	vid.loop();
  
  sliderRain = createSlider(0, 2000, 0);
  sliderRain.position(10, 10);
  sliderRain.size(width-20);

  for (let i = 0; i < 2000; i++) {
    drops[i] = new rainDrop();
  }
}

function draw() {
  background(0);
  
  //apply force to the raindrops
  //define force (wind)
  //change y to mouseY to make wind blow in all directions
  let directionX = map(mouseX, 0, width, -0.2, 0.2);
  let wind = createVector(directionX, 0);

  //make slider human controled somehow
  for (i = 0; i < sliderRain.value(); i++) {
    drops[i].show();
    drops[i].move();
  }
    // drops.applyForce(wind);//why doesn't this work? 
  
  //figure out how to make slider controled by Kinectron

}

class rainDrop {

  //Declare the local variables that define the raindrops' starting points
  constructor() {
    this.x = random(width);
    this.y = random(-500, -10);
    this.z = random(0, 20);
    this.size = map(this.z, 0, 20, 5, 20);
    this.speed = map(this.z, 0, 20, 3, 10);
    
    //Declare a variable for the wind--see applyForce() below
    this.blow = createVector();

    //Declare a gravity variable that obeys the z-axis rules above
    this.grav = map(this.z, 0, 20, 0.025, 0.2);

  }

  // Mimic a z-axis so drops appear closer or farther away:
  // Declare a z variable
  // Map the z variable to size and speed to so that the smaller #s goes from shortest to longest and slowest to fastest
  show() {
    //Draw the raindrop
    stroke(255);
    strokeWeight(map(this.z, 0.1, 20, 1, 2));
    line(this.x, this.y, this.x, this.y + this.size);
  }

  //Create the motion of the raindrop
  move() {
    this.y = this.y + this.speed;
    this.speed = this.speed + this.grav //speed increases slightly as it falls to mimick gravity

    // After the raindrop hits the bottom, it resets to its starting point and with its starting speed
    if (this.y > height) {
      this.y = random(-200, -10);
      this.speed = map(this.z, 0, 20, 4, 10);
    }
  }
  applyForce(f) {
    this.blow.add(f);
  }
}



// function rainDrop() {

//   //Declare the local variables that define the raindrops' starting points
//   this.x = random(width);
//   this.y = random(-500, -10);

//   // Mimic a z-axis so drops appear closer or farther away:
//   // Declare a z variable
//   // Map the z variable to size and speed to so that the smaller #s goes from shortest to longest and slowest to fastest
//   this.z = random(0, 20);
//   this.size = map(this.z, 0, 20, 5, 20);
//   this.speed = map(this.z, 0, 20, 3, 10);

//   //Declare a gravity variable that obeys the z-axis rules above
//   this.grav = map(this.z, 0, 20, 0.025, 0.2);

//   //Create the motion of the raindrop
//   this.fall = function() {
//     this.y = this.y + this.speed;
//     this.speed = this.speed + this.grav //speed increases slightly as it falls to mimick gravity

//     // After the raindrop hits the bottom, it resets to its starting point and with its starting speed
//     if (this.y > height) {
//       this.y = random(-200, -10);
//       this.speed = map(this.z, 0, 20, 4, 10);
//     }

//   }