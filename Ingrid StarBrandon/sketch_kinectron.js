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

let grow = 5;

function setup() {

  myCanvas = createCanvas(windowWidth, windowHeight);
  background(255);
  noStroke();

  // if (liveData) initKinectron();

}


function draw() {
  if (!liveData) loopRecordedData();
}

function drawBrandon(objectX,objectY){
  brandon = new Brandon(objectX,objectY);
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
  background(255, 20);

  let hands = [];
  let objectX;
  let objectY;
  for (var i = 0; i < body.bodies.length; i++ ) {
    if (body.bodies[i].tracked) {

      let trackedBody = body.bodies[i];

      // Get all the joints off the tracked body and do something with them
      for(var jointType in trackedBody.joints) {
        joint = trackedBody.joints[jointType];
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
          
        // translate(-windowWidth/3, -windowHeight/3);
      drawBrandon(objectX,objectY);

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
  constructor(objectX, objectY) {
    //random() variables
    this.scale1 = random(-grow, grow);
    this.scale2 = random(-grow, grow);

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
    var col = random(155,255);
    //var col1 = random(155,255);
	//var col2 = random(155,255);

    var opacity = random(10,50)/(grow/20);
    fill(120,150,col,opacity);
    rect(this.rectX, this.rectY, this.rectWidth1, this.rectHeight1);
    rect(this.rectX, this.rectY, this.rectWidth2, this.rectHeight2);

    grow+=Math.log(grow)/200;
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
