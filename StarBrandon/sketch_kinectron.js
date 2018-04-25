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


function setup() {

  myCanvas = createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();

  // if (liveData) initKinectron();

}


function draw() {
  if (!liveData) loopRecordedData();
}

function drawBrandon(){
  brandon = new Brandon(joint);
  brandon.show();
}

function loopRecordedData() {

  if (Date.now() > sentTime + loopTime) {
    bodyTracked(skeletonData[currentFrame]);
    sentTime = Date.now();

    if (currentFrame < skeletonData.length-1) {
      currentFrame++;
    } else {
      currentFrame = 0;
    }
  }

}

// function initKinectron() {
//   // Define and create an instance of kinectron
//   var kinectronIpAddress = ""; // FILL IN YOUR KINECTRON IP ADDRESS HERE
//   kinectron = new Kinectron(kinectronIpAddress);

//   // Connect to the ITP microstudio when live
//   //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

//   // Connect with application over peer
//   kinectron.makeConnection();

//   // Request all tracked bodies and pass data to your callback
//   kinectron.startTrackedBodies(bodyTracked);

// }


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

      // drawJoint(joint);
      // drawNew(joint);

      // Get the hands off the tracked body and do something with them

      // Find right hand
      // if (jointType == 11) {
      //   hands.rightHand = joint;
      //   hands.rightHandState = translateHandState(body.rightHandState);
      // }

      // // Find left hand
      // if (jointType == 7) {
      //   hands.leftHand = joint;
      //   hands.leftHandState = translateHandState(body.leftHandState);
      // }

      }
    }
  }
  //drawHands(hands);
}

//create a class for the various states that Brandon's kinectron data is drawn
class Brandon {
  constructor(joint) {
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

  show(joint) {
    rectMode(CENTER);
    fill(100,100,100,60);
    rect(this.rectX, this.rectY, this.rectWidth1, this.rectHeight1);
    rect(this.rectX, this.rectY, this.rectWidth2, this.rectHeight2);
  }

  update() {

  }

}


//// DIANA'S CODE
// function drawNew(joint) {
//   rectMode(CENTER);
//   fill(100,100,100,60);
//   rect(joint.depthX * myCanvas.width + random(-50,50), joint.depthY * myCanvas.height + random(-50,50), random(-20, 20),random(-20, 20));
//   rect(joint.depthX * myCanvas.width+random(-50,50), joint.depthY * myCanvas.height+random(-50,50), random(-20, 20),random(-20, 20));
//   rect(joint.depthX * myCanvas.width+random(-50,50), joint.depthY * myCanvas.height+random(-50,50), random(-50, 50),random(-50, 50));
//   rect(joint.depthX * myCanvas.width+random(-50,50), joint.depthY * myCanvas.height+random(-50,50), random(-20, 20),random(-20, 20));
// }


//// LISA'S ORIGINAL CODE
// // Draw skeleton
// function drawJoint(joint) {
//   fill(100);

  // // Kinect location data needs to be normalized to canvas size
  // ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 15, 15);

  // fill(200);

  // // Kinect location data needs to be normalized to canvas size
  // ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 3, 3);
// }


// // Make handstate more readable
// function translateHandState(handState) {
//   switch (handState) {
//     case 0:
//       return 'unknown';
//
//     case 1:
//       return 'notTracked';
//
//     case 2:
//       return 'open';
//
//     case 3:
//       return 'closed';
//
//     case 4:
//       return 'lasso';
//   }
// }

// // drawHand variables
// let start = 30;
// let target = 100;
// let diameter = start;
// let light = 255;
// let dark = 100;
// let hueValue = light;
// let lerpAmt = 0.3;
// let state = 'ascending';

// // Draw hands
// function drawHands(hands) {

//   //check if hands are touching
//   if ((Math.abs(hands.leftHand.depthX - hands.rightHand.depthX) < 0.01) && (Math.abs(hands.leftHand.depthY - hands.rightHand.depthY) < 0.01)) {
//     hands.leftHandState = 'clapping';
//     hands.rightHandState = 'clapping';
//   }

//   // draw hand states

//   updateHandState(hands.leftHandState, hands.leftHand);
//   updateHandState(hands.rightHandState, hands.rightHand);
// }

// // Find out state of hands
// function updateHandState(handState, hand) {

//   switch (handState) {
//     case 'closed':
//       drawHand(hand, 1, 255);
//       break;

//     case 'open':
//       drawHand(hand, 0, 255);
//       break;

//     case 'lasso':
//       drawHand(hand, 0, 255);
//       break;

//       // Created new state for clapping
//     case 'clapping':
//       drawHand(hand, 1, 'red');
//   }
// }

// // Draw the hands based on their state
// function drawHand(hand, handState, color) {

//   if (handState === 1) {
//     state = 'ascending';
//   }

//   if (handState === 0) {
//     state = 'descending';
//   }

//   if (state == 'ascending') {
//     diameter = lerp(diameter, target, lerpAmt);
//     hueValue = lerp(hueValue, dark, lerpAmt);
//   }

//   if (state == 'descending') {
//     diameter = lerp(diameter, start, lerpAmt);
//     hueValue = lerp(hueValue, light, lerpAmt);
//   }

//   fill(color);

//   // Kinect location needs to be normalized to canvas size
//   ellipse(hand.depthX * myCanvas.width, hand.depthY * myCanvas.height, diameter, diameter);
// }
