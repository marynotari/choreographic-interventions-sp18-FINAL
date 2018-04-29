// Set to true if using live kinectron data
let liveData = false;

// p5 canvas
let myCanvas = null;

// Declare kinectron
let kinectron = null;

// Recorded data variables
let sentTime = Date.now();
let currentFrame = 0;
let loopTime = 70; //bigger number = slower playback

// Declare array of data files as a global variable
let skeletonData;

// Declare first bin of skeletonData
let i = 0;

// Make sure all data files are loaded before running sketch
function preload() {
   skeletonData = [skeletonData_01, skeletonData_02, skeletonData_03, skeletonData_04, skeletonData_05];
}

// Declare p5 canvas
function setup() {

  myCanvas = createCanvas(windowWidth, windowHeight);

  // background must be in setup() or else it will draw over skeletonData
  background(255);

  // no strokes aroung rect
  noStroke();

  // if (liveData) initKinectron();

}

// If no kinectron is detected, use data files
function draw() {
  // if (!liveData)
  loopRecordedData();
}


function drawBrandon(){
  brandon = new Brandon(joint);
  brandon.show();
}

// Press UP ARROW to cycle between data files
function keyPressed() {
  if (keyCode == UP_ARROW){
    if(i<4){
    i++;}
    else{
      i = 0;
    }
  }
}

// Cycle between bins in each data file array
function loopRecordedData() {

    if (Date.now() > sentTime + loopTime) {
      bodyTracked(skeletonData[i][currentFrame]);
      sentTime = Date.now();

      if (currentFrame < skeletonData[i].length-1) {
        currentFrame++;
      } else {
        currentFrame = 0;
      }
    }
}

function bodyTracked(body) {
  background(255, 30); //continuously, slowly draw background over drawn body

  let hands = [];

  for (var i = 0; i < body.bodies.length; i++ ) {
    if (body.bodies[i].tracked) {

      let trackedBody = body.bodies[i];

      // Get all the joints off the tracked body and do something with them
      for(var jointType in trackedBody.joints) {
        joint = trackedBody.joints[jointType];

      drawBrandon();

      }
    }
  }
}

//create a class for the various states that Brandon's kinectron data is drawn
class Brandon {

  constructor() {

    // //wide ellipses
    // this.scale1 = random(-400, 400);
    // this.scale2 = random(-3, 3);

    //long ellipses
    this.scale1 = random(-5, 5);
    this.scale2 = random(-400, 400);

    //rect() variables
    this.rectX = joint.depthX * myCanvas.width + random(-100,100);
    this.rectY = joint.depthY * myCanvas.height + random(-100,100);
    this.rectWidth1 = this.scale2;
    this.rectHeight1 = this.scale1;
    this.rectWidth2 = this.scale1;
    this.rectHeight2 = this.scale2;
  }

  show() {
    rectMode(CENTER);

    // color: larger the shape, smaller the alpha
    fill(0, 0, 0, 100); //grey
    // fill(254, 0, 123, 50); //hot pink
    // fill(141, 44, 255, 70); //purple

    // rect(this.rectX, this.rectY, this.rectWidth1, this.rectHeight1);
    // rect(this.rectX, this.rectY, this.rectWidth2, this.rectHeight2);

    ellipse(this.rectX, this.rectY, this.rectWidth1, this.rectHeight1);
    // ellipse(this.rectX, this.rectY, this.rectWidth2, this.rectHeight2);
  }

}
