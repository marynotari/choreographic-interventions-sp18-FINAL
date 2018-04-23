// Create a raindrop object that can be duplicated and manipulated in the sketch.
//
// NOTE: This is an old version. Updates have been made directly in the sketch.
//
// QUESTION:Is it better to use a function or a class?
//          I tried replicating what I had learned about classes last week.
//					It didn't work out so I went back to functions.
//					This thing is: I like the concept of classes better. It make more sense to me.
//					What did I do wrong?
// 
// QUESTION:I like the idea of making objects separate files.
//					How do I link this within index.html so that my sketch can find it?


function rainDrop() {

  //Declare the local variables that define the raindrop 
  this.x = random(width);
  this.y = random(-200, -10);
  //this.size = this.y + random(0, 20);
  this.speed = random(3, 10);

  //Create the motion of the raindrop
  this.fall = function() {
    this.y = this.y + this.speed;

    if (this.y > height) {
      this.y = random(-200, -10);
    }

  }

  //Draw the raindrop in the sketch
  this.display = function() {
    stroke(255);
    strokeWeight(random(0, 3));
    line(this.x, this.y, this.x, this.y+10);
  }
}