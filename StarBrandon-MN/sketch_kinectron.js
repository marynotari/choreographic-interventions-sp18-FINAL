// Set to true if using live kinectron data
let liveData = false;

// p5 canvas
let myCanvas = null;

// Declare kinectron
let kinectron = null;

// Recorded data variables
let sentTime = Date.now();
let currentFrame = 0;
let loopTime = 100; //bigger number = slower playback

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
  background(0);

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

      if (currentFrame < skeletonData.length-1) {
        currentFrame++;
      } else {
        currentFrame = 0;
      }
    }
}

function bodyTracked(body) {
  background(0, 20);

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
    //random() variables
    this.scale1 = random(-20, 20);
    this.scale2 = random(-50, 50);

    //rect() variables
    this.rectX = joint.depthX * myCanvas.width + random(-50,50);
    this.rectY = joint.depthY * myCanvas.height + random(-50,50);
    this.rectWidth1 = this.scale1;
    this.rectHeight1 = this.scale1;
    this.rectWidth2 = this.scale2;
    this.rectHeight2 = this.scale1;
  }

  show() {
    rectMode(CENTER);
    fill(255,255,255,60);
    rect(this.rectX, this.rectY, this.rectWidth1, this.rectHeight1);
    rect(this.rectX, this.rectY, this.rectWidth2, this.rectHeight2);
  }

}
