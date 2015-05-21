// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){
  var context = this;
  this.timeBetweenSteps = timeBetweenSteps;
  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');
  this.radius = 25;

  this.step();
  this.pair = null;

  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);

  this.$node.on('click', function (event) {

    _.each(dancers, function(dancer) {
      dancer.setPair(context);
      dancer.goToPair();
    });

    context.setPair(context);

  });

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
    left: left,
    width: this.radius*2,
    height: this.radius*2
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.moveToPosition = function(top, left, transitionTime){
  var time = transitionTime || 400;

  this.left = left;
  this.top = top;

  var styleSettings = {
    top: top,
    left: left
  };

  this.$node.animate(styleSettings, time);

}

Dancer.prototype.lineUp = function() {
  this.pair = null;

  var maxX = window.innerWidth;
  if (this.left > (maxX/2)) {
    this.left = maxX - 0.1* maxX;
  } else {
    this.left = 0.1*maxX;
  }
  this.moveToPosition(this.top, this.left);
};

Dancer.prototype.randomStep = function() {
  this.left = Math.floor(Math.random() * window.innerWidth);
  this.top = Math.floor(Math.random() * window.innerHeight);
  this.moveToPosition(this.top, this.left);
};

Dancer.prototype.findDistance = function (otherDancer) {

  var xDist = otherDancer.left - this.left;
  var yDist = otherDancer.top - this.top;

  return Math.sqrt(xDist*xDist + yDist*yDist);

};

Dancer.prototype.findNearestNeighbor = function (dancers) {
  var nearest = null;
  var self = this;
  var shortest = Infinity;

  _.each(dancers, function (dancer) {
    var distance = self.findDistance(dancer);

    if ((distance < shortest) && (self !== dancer) && (dancer.pair === null)) {
      nearest = dancer;
      shortest = distance;
    }

  });

  return nearest;
};

Dancer.prototype.pairUp = function (dancers) {
  if (this.pair === null) {
    var nearest = this.findNearestNeighbor(dancers);
    if (nearest === null) {
      nearest = this;
    }
    this.setPair(nearest);
  }
};

Dancer.prototype.joinPair = function() {
  var leftOffset = (this.left > this.pair.left) ? this.radius : -this.radius;
  var topOffset = (this.top > this.pair.top) ? this.radius : -this.radius;

  var newLeft = (this.left + this.pair.left)/2 + leftOffset;
  var newTop = (this.top + this.pair.top)/2 + topOffset;
  this.moveToPosition(newTop, newLeft);
};

Dancer.prototype.goToPair = function() {
  var leftOffset = (this.left > this.pair.left) ? this.radius : -this.radius;
  var topOffset = (this.top > this.pair.top) ? this.radius : -this.radius;

  var newLeft = this.pair.left + leftOffset;
  var newTop = this.pair.top + topOffset;
  this.moveToPosition(newTop, newLeft);
};

Dancer.prototype.beYourSelf = function() {
  this.pair = null;
  this.randomStep();
};

Dancer.prototype.setPair = function (pairDancer) {
    this.pair = {};
    this.pair.pointer = pairDancer;
    this.pair.left = pairDancer.left;
    this.pair.top = pairDancer.top;
    if (pairDancer !== this) {
      pairDancer.pair = {};
      pairDancer.pair.pointer = this;
      pairDancer.pair.left = this.left;
      pairDancer.pair.top = this.top;
    }
}

