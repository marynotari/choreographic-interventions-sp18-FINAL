// Set to true if using live kinectron data
let liveData = true;

// p5 canvas
let myCanvas = null;

// Declare kinectron
let kinectron = null;

// Recorded data variables
let sentTime = Date.now();
let currentFrame = 0;
let loopTime = 100; //bigger number = slower playback
let j;
let joints = [
  "SPINEBASE",
  "SPINEMID",
  "NECK",
  "HEAD",
  "SHOULDERLEFT",
  "ELBOWLEFT",
  "WRISTLEFT",
  "HANDLEFT",
  "SHOULDERRIGHT",
  "ELBOWRIGHT",
  "WRISTRIGHT",
  "HANDRIGHT",
  "HIPLEFT",
  "KNEELEFT",
  "ANKLELEFT",
  "FOOTLEFT",
  "HIPRIGHT",
  "KNEERIGHT",
  "ANKLERIGHT",
  "FOOTRIGHT",
  "SPINESHOULDER",
  "HANDTIPLEFT",
  "THUMBLEFT",
  "HANDTIPRIGHT",
  "THUMBRIGHT"
];

// Declare array of data files as a global variable
let skeletonData;

// Declare first bin of skeletonData
let i = 0;

// Make sure all data files are loaded before running sketch
function preload() {
   skeletonData = [skeletonData_01, skeletonData_02, skeletonData_03, skeletonData_04, skeletonData_05];
}


function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  background(0);

  // if (liveData) initKinectron();
  kinectron = new Kinectron("172.16.231.145");
  // Connect with application over peer
  kinectron.makeConnection();
  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked1);
  // Draw black background

}


function draw() {
  loopRecordedData();
}

// Press UP ARROW to cycle between data files
function keyPressed() {
  if (keyCode == UP_ARROW){
    if(i < 4){
      i ++;
    }else{
      i = 0;
    }
  }
}

function loopRecordedData() {

  if (Date.now() > sentTime + loopTime) {
    bodyTracked(skeletonData[i][currentFrame]);
    sentTime = Date.now();

    if (currentFrame < skeletonData.length-1) {
      currentFrame ++;
    } else {
      currentFrame = 0;
    }
  }

}


// for Ingrid's movements capture
function bodyTracked1(body) {
  // Draw all the joints
  kinectron.getJoints(drawJoint);

  // Get the selected joint
  let joint1 = body.joints[j];
  let pos = scaleJoint(joint1);

  noStroke();
  fill(255);
  //Draw a bigger, red ellipse for the selected joint
  ellipse(pos.x, pos.y, 50, 50);

  // Print which joint is selected
  textSize(18);
  text("RT/LFT to change joints. " + j + ": " + joints[j], 10, 20);
}

function drawJoint(joint1) {
  let pos = scaleJoint(joint1);
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 10, 10);
}

function scaleJoint(joint1) {
  return {
    x: (joint1.cameraX * width / 2) + width / 2,
    y: (-joint1.cameraY * width / 2) + height / 2,
  }
}

// for Brandon's data
function bodyTracked(body) {
  background(0, 20);
  let hands = [];
  let objectX;
  let objectY;
  for (var i = 0; i < body.bodies.length; i++ ) {
    if (body.bodies[i].tracked) {

      let trackedBody = body.bodies[i];

      // Get all the joints off the tracked body and do something with them
      for(var jointType in trackedBody.joints) {
        
        joint = trackedBody.joints[jointType];
        //assign data to new variables
        objectX = joint.depthX;
        objectY = joint.depthY;
        if (jointType == 8||jointType == 9||jointType == 10||jointType == 11){
          objectX *= 1.5;
          // objectY *= 2;
        }
        if (jointType == 4||jointType == 5||jointType == 6||jointType ==7 ){
          objectX *= 0.5;
          // objectY *= 0.5;
        }
      drawBrandon(objectX,objectY);
      }
    }
  }
}


function drawBrandon(objectX, objectY){
  brandon = new Brandon(objectX,objectY);
  brandon.show();
}

//create a class for the various states that Brandon's kinectron data is drawn
class Brandon {
  constructor(objectX, objectY) {
    //random() variables
    this.scale1 = random(-20, 20);
    this.scale2 = random(-50, 50);

    //rect() variables
    this.rectX = objectX * myCanvas.width + random(-50,50);
    this.rectY = objectY * myCanvas.height + random(-50,50);
    //scale
    this.rectWidth1 = this.scale1;
    this.rectHeight1 = this.scale1;
    this.rectWidth2 = this.scale2;
    this.rectHeight2 = this.scale1;
  }

  show() {
    rectMode(CENTER);
    fill(100,100,100,60);
    rect(this.rectX, this.rectY, this.rectWidth1, this.rectHeight1);
    rect(this.rectX, this.rectY, this.rectWidth2, this.rectHeight2);
  }

  update() {

  }

}


