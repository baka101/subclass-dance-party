var RainbowDancer = function(top, left, timeBetweenSteps, color) {
  this.color = color || 'green';
  BlinkyDancer.call(this, top, left, timeBetweenSteps);
  //debugger;
  //this.colors = ['red', 'blue', 'green', 'yellow'];
};

RainbowDancer.prototype = Object.create(BlinkyDancer.prototype);
RainbowDancer.prototype.constructor = RainbowDancer;

RainbowDancer.prototype.step = function() {
  BlinkyDancer.prototype.step.call(this);
  //var index = Math.floor(Math.random() * this.colors.length);
  var newProp = '10px solid ' + this.color;
  this.$node.css('border', newProp);
};
