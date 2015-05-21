var MovingRainbowDancer = function (top, left, timeBetweenSteps, colors) {

  this.yDirection = Math.floor(Math.random()*2-1);
  this.xDirection = Math.floor(Math.random()*2-1);
  this.stepSize = 10;

  RainbowDancer.call(this, top, left, timeBetweenSteps, colors);
};

MovingRainbowDancer.prototype = Object.create(RainbowDancer.prototype);
MovingRainbowDancer.prototype.constructor = MovingRainbowDancer;

MovingRainbowDancer.prototype.step = function () {
  RainbowDancer.prototype.step.call(this);
  var maxX = window.innerWidth;
  var maxY = window.innerHeight;

  this.top = (this.top + this.stepSize*this.yDirection);
  this.left = (this.left + this.stepSize*this.xDirection);

  //reverse direction if we hit edge of window
  if (this.top > maxY || this.top < 0) {
    this.yDirection = -1 * this.yDirection;
  }

  if (this.left > maxX || this.left < 0) {
    this.xDirection = -1 * this.xDirection;
  }

  this.setPosition(this.top, this.left);

};

MovingRainbowDancer.prototype.lineUp = function() {
  Dancer.prototype.lineUp.call(this);
  this.stepSize = 0;
};
