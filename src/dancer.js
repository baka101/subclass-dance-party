// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){

  this.timeBetweenSteps = timeBetweenSteps;
  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');

  this.step();

  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);

};

Dancer.prototype.step = function(){
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  setTimeout(this.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left){
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //

  this.top = top;
  this.left = left;

  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.moveToPosition = function(top, left){

  this.left = left;
  this.top = top;

  var styleSettings = {
    top: top,
    left: left
  };

  this.$node.animate(styleSettings);

}

Dancer.prototype.lineUp = function() {
  var maxX = window.innerWidth;
  if (this.left > (maxX/2)) {
    this.left = maxX - 0.1* maxX;
  } else {
    this.left = 0.1*maxX;
  }
  this.setPosition(this.top, this.left);
};

Dancer.prototype.randomStep = function() {
  this.left = Math.floor(Math.random() * window.innerWidth);
};

Dancer.prototype.findDistance = function (otherDancer) {

  var xDist = otherDancer.left - this.left;
  var yDist = otherDancer.top - this.top;

  return Math.sqrt(xDist*xDist + yDist*yDist);

};

Dancer.prototype.findNearestNeighbor = function (dancers) {
  var nearest;
  var self = this;
  var shortest = Infinity;

  _.each(dancers, function (dancer) {
    var distance = self.findDistance(dancer);

    if ((distance < shortest) && (self !== dancer)){
      nearest = dancer;
      shortest = distance;
    }

  });

  return nearest;
}

Dancer.prototype.pairUp = function () {
  var nearest = this.findNearestNeighbor();

  var centerX = (this.left + nearest.left)/2;
  var centerY = (this.top + nearest.top)/2;





}
